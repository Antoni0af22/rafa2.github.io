import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhdT7ANFH9DDKOLwG130pWaeA6wczUiVk",
    authDomain: "rafa2-d1701.firebaseapp.com",
    projectId: "rafa2-d1701",
    storageBucket: "rafa2-d1701.appspot.com",
    messagingSenderId: "202617105676",
    appId: "1:202617105676:web:f9e4a0650dc99aa5316d29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)