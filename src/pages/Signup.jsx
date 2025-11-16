// src/pages/Signup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Link, UserPlus } from 'lucide-react';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { auth, googleProvider } from '../firebase'; 
import { notifySuccess, notifyError } from '../components/Toast'; 

const validatePassword = (password) => {
    if (password.length < 6) {
        return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    return null; // Valid
};

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --- Helper function for navigation after successful event ---
    const handleSuccessfulEvent = () => {
        notifySuccess("Registration successful! Welcome to SkillSwap.");
        navigate('/home', { replace: true });
    };

    // --- 1. Traditional Email/Password Signup Function ---
    const signUpWithForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPasswordError('');

        const validationMessage = validatePassword(password);
        if (validationMessage) {
            setPasswordError(validationMessage);
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update user profile (Name and PhotoURL)
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL || null, // Allow null if PhotoURL is empty
            });

            handleSuccessfulEvent();
        } catch (error) {
            console.error("Signup error:", error.message);
            notifyError("Registration Failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- 2. Google Sign-In/Signup Function ---
    const signUpWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            handleSuccessfulEvent();
        } catch (error) {
            console.error("Google signup error:", error.message);
            notifyError("Google sign up failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Check validation on password change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const validationMessage = validatePassword(newPassword);
        setPasswordError(validationMessage);
    };


    return (
        <div className="flex justify-center items-center py-10 min-h-[70vh]">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-rose-200 text-center">
                <h2 className="text-3xl font-bold text-rose-600 mb-6 font-serif">Create Account</h2>
                
                {/* --- Traditional Signup Form --- */}
                <form onSubmit={signUpWithForm} className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="relative">
                        <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150"
                        />
                    </div>

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
                    
                    {/* Photo URL Field */}
                    <div className="relative">
                        <Link className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="url"
                            placeholder="Optional Photo URL (for Avatar)"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password (Min 6 chars, Upper/Lower)"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150 ${passwordError ? 'border-red-500' : 'border-rose-300'}`}
                        />
                    </div>
                    
                    {/* Password Error Message */}
                    {passwordError && (
                        <p className="text-sm text-red-600 text-left -mt-2">{passwordError}</p>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !!passwordError}
                        className="w-full flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Registering...' : <><UserPlus className="w-5 h-5 mr-2" /> Register</>}
                    </button>
                </form>

                <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                    <p className="text-center font-semibold mx-4 text-gray-500 text-sm">OR</p>
                </div>

                {/* --- Social Login Button (Google) --- */}
                <button
                    onClick={signUpWithGoogle} 
                    disabled={isLoading}
                    className="w-full flex items-center justify-center bg-white text-rose-600 font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 border border-rose-300 hover:bg-rose-50"
                >
                    <i className="fa-brands fa-google text-lg mr-3"></i>
                    Sign up with Google
                </button>

                {/* --- Login Link --- */}
                <p className="mt-6 text-sm text-gray-600">
                    Already have an account? 
                    <a href="/login" className="text-rose-600 hover:text-rose-800 font-semibold ml-1 transition duration-300">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;