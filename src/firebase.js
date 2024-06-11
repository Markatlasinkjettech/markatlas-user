 import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4qjcP40hgzx-gWKqVB6c9h9OKpecZobw",
    authDomain: "lms-1-36b1f.firebaseapp.com",
    projectId: "lms-1-36b1f",
    storageBucket: "lms-1-36b1f.appspot.com",
    messagingSenderId: "568729903010",
    appId: "1:568729903010:web:5e85a998503b1054f9dcfb",
    measurementId: "G-Z5844EFCH1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
 const auth = getAuth(app);
 const db = getFirestore(app); // Export db
 const storage = getStorage(app);
 
 export {  db,app, storage, auth };


