// src/pages/Login.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth'; // <-- Core Firebase Auth function
import { auth, googleProvider } from '../firebase'; // <-- Import Auth/Provider
import { LogIn } from 'lucide-react';

const Login = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    // --- Google Sign-In Function ---
    const signInWithGoogle = async () => {
        try {
            // signInWithPopup ব্যবহার করে পপ-আপ ওপেন করা
            await signInWithPopup(auth, googleProvider);
            
            // সফল লগইনের পর সংরক্ষিত পথে রিডাইরেক্ট করা
            const redirectPath = sessionStorage.getItem('redirectPath') || '/profile'; 
            sessionStorage.removeItem('redirectPath');
            
            alert("SUCCESS: Successfully logged in!");
            navigate(redirectPath, { replace: true });
        } catch (error) {
            console.error("Google sign in error:", error.message);
            alert("ERROR: Google sign in failed: " + error.message);
        }
    };
    // -----------------------------

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/profile', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="flex justify-center items-center py-20 min-h-[60vh]">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-rose-200 text-center">
                <h2 className="text-3xl font-bold text-rose-600 mb-6 font-serif">Sign In</h2>
                <p className="mb-6 text-gray-600">Access protected content and book your session.</p>
                
                <button
                    onClick={signInWithGoogle} // <-- Button calls the function
                    className="w-full flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.01]"
                >
                    <LogIn className="w-5 h-5 mr-3" /> Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;