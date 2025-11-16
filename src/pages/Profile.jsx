// src/pages/Profile.jsx (Final Aesthetic Design)

import React from 'react';
import { User, Mail, Camera, Edit, UserCircle } from 'lucide-react';
import { notifySuccess } from '../components/Toast'; // Assuming toast is correctly set up

const Profile = ({ user }) => {

    if (!user) {
        return <div className="text-center py-20 text-xl font-semibold text-rose-600">User data not available. Please log in again.</div>;
    }

    const { displayName, email, photoURL } = user;

    const handleUpdateProfile = () => {
        // Placeholder functionality: In a real app, this would open a modal/form for update.
        notifySuccess("Update Profile feature coming soon!");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[70vh]">
            
            <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-rose-200 overflow-hidden transform transition duration-500 hover:shadow-rose-400/50">
                
                {/* Header Banner - Subtle Gradient */}
                <div className="h-32 bg-gradient-to-r from-rose-600 to-pink-500 relative flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white font-serif tracking-wider mb-6">User Profile</h1>
                </div>

                {/* Profile Content */}
                <div className="p-8 md:p-12 text-center relative">
                    
                    {/* Avatar Section - Adjusted vertical position */}
                    {/* 🎯 Alignment Fix: Reduced -translate-y to reduce vertical gap */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-24">
                        <div className="relative inline-block border-8 border-white rounded-full shadow-2xl">
                            {photoURL ? (
                                <img 
                                    className="w-32 h-32 rounded-full object-cover" 
                                    src={photoURL} 
                                    alt={displayName || 'User'}
                                />
                            ) : (
                                <UserCircle className="w-32 h-32 text-rose-500" />
                            )}
                            {/* Photo Upload Icon */}
                            <div className="absolute bottom-0 right-0 p-2 bg-rose-600 rounded-full text-white border-2 border-white cursor-pointer hover:bg-rose-700 transition duration-300">
                                <Camera className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16"> {/* Compensated padding for new avatar position */}
                        
                        {/* User Name */}
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-1 mt-4 flex items-center justify-center">
                            <User className="w-6 h-6 mr-3 text-rose-500 hidden sm:inline-block" /> 
                            {displayName || "User Name Not Set"}
                        </h2>
                        
                        {/* User Email */}
                        <p className="text-lg text-gray-600 mb-8 flex items-center justify-center">
                            <Mail className="w-5 h-5 mr-3 text-rose-500" /> 
                            {email}
                        </p>
                        
                        <div className="space-y-4 pt-4 border-t border-rose-100">
                            {/* --- Update Profile Button --- */}
                            <button
                                onClick={handleUpdateProfile}
                                className="w-full max-w-xs mx-auto flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01]"
                            >
                                <Edit className="w-5 h-5 mr-2" /> Update Profile
                            </button>

                            <div className="text-md text-gray-500 pt-2">
                                {/* Member Since Date */}
                                <p>Member since: **{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}**</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;