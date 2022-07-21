// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1m4NQlEiD0elZcZteNaoCmyg5gH11JQk",
  authDomain: "readit-9db07.firebaseapp.com",
  projectId: "readit-9db07",
  storageBucket: "readit-9db07.appspot.com",
  messagingSenderId: "1001067697765",
  appId: "1:1001067697765:web:e657c844c86783a979d88c",
  measurementId: "G-W4HGM2B8E5"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export { auth, db };