// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth, googleProvider } from '../firebase'; 
import { LogIn, Mail, Lock, Globe } from 'lucide-react'; // 🎯 Added Globe icon
import { notifySuccess, notifyError } from '../components/Toast'; 

const Login = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Synchronously check if the user is already logged in.
    if (isLoggedIn) {
        navigate('/home', { replace: true });
        return null;
    }

    // --- Helper function for navigation after successful login ---
    const handleSuccessfulLogin = () => {
        const redirectPath = sessionStorage.getItem('redirectPath') || '/home';
        sessionStorage.removeItem('redirectPath');
        notifySuccess("Successfully logged in!");
        navigate(redirectPath, { replace: true });
    };

    // --- 1. Traditional Email/Password Sign-In Function ---
    const signInWithForm = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            notifyError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        try {
            // Logs in using Firebase Email/Password
            await signInWithEmailAndPassword(auth, email, password);
            handleSuccessfulLogin();
        } catch (error) {
            console.error("Email/Password sign in error:", error.message);
            notifyError("Login Failed: Please check your email and password.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- 2. Google Sign-In Function ---
    const signInWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            handleSuccessfulLogin();
        } catch (error) {
            console.error("Google sign in error:", error.message);
            notifyError("Google sign in failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 min-h-[60vh]">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-rose-200 text-center">
                <h2 className="text-3xl font-bold text-rose-600 mb-6 font-serif">Sign In to SkillSwap</h2>
                
                {/* --- Traditional Login Form --- */}
                <form onSubmit={signInWithForm} className="space-y-4">
                    
                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150"
                        />
                    </div>
                    
                    {/* Forget Password Link */}
                    <div className="flex justify-end text-sm">
                        <a href="/forget-password" className="text-rose-600 hover:text-rose-800 transition duration-300">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing In...' : <><LogIn className="w-5 h-5 mr-2" /> Log In</>}
                    </button>
                </form>

                <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                    <p className="text-center font-semibold mx-4 text-gray-500 text-sm">OR</p>
                </div>

                {/* --- Social Login Button (Google) --- */}
                <button
                    onClick={signInWithGoogle} 
                    disabled={isLoading}
                    // Styling: White BG, Rose Text, Subtle Rose Border
                    className="w-full flex items-center justify-center bg-white text-rose-600 font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 border border-rose-300 hover:bg-rose-50"
                >
                    {/* 🎯 FIX: Using Lucide-React Globe icon */}
                    <Globe className="w-5 h-5 mr-3 text-rose-600" />
                    Sign in with Google
                </button>

                {/* --- Signup Link --- */}
                <p className="mt-6 text-sm text-gray-600">
                    Don't have an account? 
                    <a href="/Signup" className="text-rose-600 hover:text-rose-800 font-semibold ml-1 transition duration-300">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;