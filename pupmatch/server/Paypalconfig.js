const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
  'mode': 'sandbox', // Modo sandbox para pruebas
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

module.exports = paypal;
