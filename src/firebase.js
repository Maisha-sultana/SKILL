// src/firebase.js (Corrected to export 'auth' and 'googleProvider')

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- Required for Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBldMNhpBc3NpPsndlh_9xx_SBpNnIIFW8",
  authDomain: "skillswap-3ba4e.firebaseapp.com",
  projectId: "skillswap-3ba4e",
  storageBucket: "skillswap-3ba4e.firebasestorage.app",
  messagingSenderId: "1052714429914",
  appId: "1:1052714429914:web:8f5c02597f7a225b3924e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it as a named export 'auth'
export const auth = getAuth(app); // 👈 THIS FIXES THE SYNTAX ERROR IN APP.JSX
export const googleProvider = new GoogleAuthProvider(); // 👈 Required for Login.jsx

// export default app; // Default export can be kept or removed; 'auth' is the critical named export.