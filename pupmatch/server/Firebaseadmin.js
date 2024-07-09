const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { admin, db, storage };
