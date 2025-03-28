// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCcTaujfClv1_y9a8CyZYlio7sx5OeYlX0",
  authDomain: "tibet-together.firebaseapp.com",
  projectId: "tibet-together",
  storageBucket: "tibet-together.appspot.com",
  messagingSenderId: "1044233534349",
  appId: "1:1044233534349:web:d71f01eed242d31db79bc4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

console.log("Firebase initialized successfully");
