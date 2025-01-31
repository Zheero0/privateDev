// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-gKd7UWHC_p13NQqU69JmBJ-5whdF2VU",
  authDomain: "chatapp-24059.firebaseapp.com",
  projectId: "chatapp-24059",
  storageBucket: "chatapp-24059.firebasestorage.app",
  messagingSenderId: "726167387925",
  appId: "1:726167387925:web:134662268daf4da3b6f31c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {app, auth, db}
