import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "react-firebase-ecommerce-2fb71.firebaseapp.com",
  projectId: "react-firebase-ecommerce-2fb71",
  storageBucket: "react-firebase-ecommerce-2fb71.appspot.com",
  messagingSenderId: "982555915556",
  appId: "1:982555915556:web:86fee61705a44a6eb12fb1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;