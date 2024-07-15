import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ onSuccess, onReady }) => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

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
            alert('Transaction completed by ' + details.payer.name.given_name);
            if (onSuccess) {
              onSuccess(details);
            }
          });
        }}
        onCancel={() => {
          alert('Transaction was cancelled by the user.');
        }}
        onError={(err) => {
          console.error('Error occurred during the transaction', err);
          alert('An error occurred during the transaction. Please try again.');
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
