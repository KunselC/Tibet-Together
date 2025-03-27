// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcTaujfClv1_y9a8CyZYlio7sx5OeYlX0",
  authDomain: "tibet-together.firebaseapp.com",
  projectId: "tibet-together",
  storageBucket: "tibet-together.firebasestorage.app",
  messagingSenderId: "1044233534349",
  appId: "1:1044233534349:web:d71f01eed242d31db79bc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
