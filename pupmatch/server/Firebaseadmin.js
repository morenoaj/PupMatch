const admin = require('firebase-admin');
const serviceAccount = require('./pupmatch-5e118-firebase-adminsdk-vo2qg-61114b0055.json');

// server/firebaseAdmin.js

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL:  ""// Replace with your database URL
};

const app = admin.initializeApp(firebaseConfig);
const db = app.firestore();

module.exports = db;
