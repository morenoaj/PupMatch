const express = require('express');
const { db } = require('../Firebaseadmin');
const { getAuth } = require('firebase-admin/auth');

const router = express.Router();

router.post('/subscription', async (req, res) => {
  const { subscriptionStatus, paymentDetails } = req.body;

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

    // Actualizar el estado del usuario y almacenar los detalles del pago
    await userRef.update({
      subscriptionStatus: subscriptionStatus,
      paymentDetails: paymentDetails,
    });

    res.send('Subscription updated successfully');
  } catch (err) {
    console.error('Error updating subscription:', err);
    return res.status(500).send('Error updating subscription');
  }
});

module.exports = router;
