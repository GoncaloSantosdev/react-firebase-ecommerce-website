import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf1yy3KkhgAE9I4kbQsg8crv9hvTnAnhQ",
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