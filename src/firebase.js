<<<<<<< HEAD
 import { initializeApp } from "firebase/app";
=======
import { initializeApp } from "firebase/app";
>>>>>>> master
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaq8_4hGbQFfqsHzrgZVv4zCB_WC-kq2M",
    authDomain: "markatlas-51d56.firebaseapp.com",
    projectId: "markatlas-51d56",
    storageBucket: "markatlas-51d56.appspot.com",
    messagingSenderId: "404314687009",
    appId: "1:404314687009:web:f06ec2a8457544e6e50560",
    measurementId: "G-68KBS80LKB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
 const auth = getAuth(app);
 const db = getFirestore(app); // Export db
 const storage = getStorage(app);
 
 export {  db,app, storage, auth };


