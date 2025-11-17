// src/pages/ForgetPassword.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Key, Send } from 'lucide-react'; 
import { sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase function
import { auth } from '../firebase'; // Import auth instance
import { notifySuccess, notifyError } from '../components/Toast'; 

const ForgotPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 1. Get initial email from Login page state if available
    const initialEmail = location.state?.email || '';
    
    const [email, setEmail] = useState(initialEmail);
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Effect to update email state if location state changes (from navigation)
    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);


    // --- Handle Password Reset ---
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!email) {
            notifyError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        try {
            // Send the password reset email using Firebase
            await sendPasswordResetEmail(auth, email);
            
            notifySuccess(`Password reset email sent to ${email}. Please check your inbox.`);
            setIsSent(true); 

            // 🎯 On clicking the reset button, redirect the user to Gmail.
            setTimeout(() => {
                window.location.href = 'https://mail.google.com/'; 
            }, 1000); // Delay 1 second to let toast show
            
        } catch (error) {
            console.error("Password reset error:", error.message);
            notifyError("Failed to send reset email: " + error.message);
            setIsLoading(false);
            setIsSent(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 min-h-[60vh]">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-rose-200 text-center">
                <h2 className="text-3xl font-bold text-rose-600 mb-6 font-serif">Forgot Password</h2>
                <p className="text-gray-600 mb-6">Enter your email address to receive a password reset link.</p>
                
                <form onSubmit={handlePasswordReset} className="space-y-6">
                    
                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            readOnly={isLoading || isSent}
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150 bg-white"
                        />
                    </div>
                    
                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        disabled={isLoading || isSent}
                        className="w-full flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : isSent ? <><Key className="w-5 h-5 mr-2" /> Link Sent!</> : <><Send className="w-5 h-5 mr-2" /> Reset Password</>}
                    </button>
                </form>

                {/* --- Back to Login Link --- */}
                <p className="mt-6 text-sm text-gray-600">
                    Remembered your password? 
                    <a href="/login" className="text-rose-600 hover:text-rose-800 font-semibold ml-1 transition duration-300">
                        Back to Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;