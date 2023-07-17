// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrvU4OsbKZq7KnxTdyU-xp64RXI-p7Me4",
    authDomain: "linkedin-clone-app-3ba81.firebaseapp.com",
    projectId: "linkedin-clone-app-3ba81",
    storageBucket: "linkedin-clone-app-3ba81.appspot.com",
    messagingSenderId: "633587295146",
    appId: "1:633587295146:web:067c981bd99e6f2de141d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
