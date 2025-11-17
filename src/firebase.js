

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyBldMNhpBc3NpPsndlh_9xx_SBpNnIIFW8",
  authDomain: "skillswap-3ba4e.firebaseapp.com",
  projectId: "skillswap-3ba4e",
  storageBucket: "skillswap-3ba4e.firebasestorage.app",
  messagingSenderId: "1052714429914",
  appId: "1:1052714429914:web:8f5c02597f7a225b3924e3"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider(); 

