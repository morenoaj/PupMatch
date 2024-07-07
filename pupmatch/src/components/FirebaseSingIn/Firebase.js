import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4mQmaG1dxy4T1d67-pTDbK69VQso-OFE",
  authDomain: "pupmatch-5e118.firebaseapp.com",
  databaseURL: "https://pupmatch-5e118-default-rtdb.firebaseio.com",
  projectId: "pupmatch-5e118",
  storageBucket: "pupmatch-5e118.appspot.com",
  messagingSenderId: "747085021886",
  appId: "1:747085021886:web:ec4244c66a3ce5d25dd4ef",
  measurementId: "G-JSCWHJ7G0N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
