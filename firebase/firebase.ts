// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdDqmZkLlIhaW9Bg7GpHSBi0Ut39vZyNM",
    authDomain: "mondayfc-dd087.firebaseapp.com",
    projectId: "mondayfc-dd087",
    storageBucket: "mondayfc-dd087.appspot.com",
    messagingSenderId: "372384488542",
    appId: "1:372384488542:web:b772c19046c5123ffe68cf",
    measurementId: "G-W226H3XW6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db