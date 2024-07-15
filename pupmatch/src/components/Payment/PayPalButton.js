import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const PayPalButton = ({ onSuccess, onReady }) => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  const navigate = useNavigate();

  const handleSuccess = async (details) => {
    console.log('Transaction completed by ' + details.payer.name.given_name);

    try {
      const idToken = await getAuth().currentUser.getIdToken(true);

      const response = await fetch('http://localhost:5000/paypal/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          subscriptionStatus: 'active',
          paymentDetails: details
        })
      });

      if (response.ok) {
        console.log('Subscription updated successfully');
        navigate('/editprofile'); // Redirecciona a la página de edición de perfil
      } else {
        console.error('Failed to update subscription');
      }
    } catch (error) {
      console.error('Error during the transaction:', error);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        style={{
          layout: 'horizontal',
          color: 'blue',
          shape: 'pill',
          label: 'paypal'
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '4.99', // Monto de la suscripción
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            if (onSuccess) {
              onSuccess(details);
            }
            handleSuccess(details);
          });
        }}
        onInit={(data, actions) => {
          if (onReady) {
            onReady(actions);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
