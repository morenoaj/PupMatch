const express = require('express');
const paypal = require('../Paypalconfig');
const transporter = require('../mail');
const { db } = require('../Firebaseadmin');
const { getAuth } = require('firebase-admin/auth');

const router = express.Router();

router.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:5000/paypal/success",
      "cancel_url": "http://localhost:5000/paypal/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Subscription",
          "sku": "001",
          "price": "4.99",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "4.99"
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error('PayPal Payment Creation Error:', error);
      return res.status(500).send(error);
    }
    const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
    if (approvalUrl) {
      return res.json({ approvalUrl: approvalUrl.href });
    } else {
      console.error('No approval URL found.');
      return res.status(500).send('No approval URL found.');
    }
  });
});

router.get('/success', async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "4.99"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      console.error('PayPal Payment Execution Error:', error.response);
      return res.status(500).send(error);
    }

    try {
      // Obtener el token del ID del usuario autenticado
      const idToken = req.headers.authorization.split('Bearer ')[1];
      const decodedToken = await getAuth().verifyIdToken(idToken);
      const userUid = decodedToken.uid;

      const userRef = db.collection('users').doc(userUid);
      const doc = await userRef.get();

      if (!doc.exists) {
        console.error('No such document!');
        return res.status(404).send('User not found');
      }

      const userEmail = doc.data().email;
      const subscriptionStatus = 'active';

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: userEmail,
        subject: 'Payment Receipt',
        text: `Thank you for your payment. Here are the details:\n\n${JSON.stringify(payment, null, 2)}`
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);

          const invoiceRef = db.collection('invoices').doc();
          await invoiceRef.set({
            userId: userUid,
            paymentDetails: payment,
            emailSent: true,
            emailSentDate: new Date(),
            subscriptionStatus: subscriptionStatus
          });

          // Actualizar el estado del usuario a premium y configurar la suscripción
          const premiumEndDate = new Date();
          premiumEndDate.setDate(premiumEndDate.getDate() + 29);

          await userRef.update({
            premium: true,
            premiumEndDate: premiumEndDate,
            subscriptionStatus: subscriptionStatus
          });

          res.send('Success');
        }
      });
    } catch (err) {
      console.error('Error retrieving user data:', err);
      return res.status(500).send('Error retrieving user data');
    }
  });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
