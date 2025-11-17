import React, { useState } from 'react';
import { User, Mail, Camera, Edit, UserCircle, Save, X, Link } from 'lucide-react';
import { updateProfile } from 'firebase/auth'; 
import { auth } from '../firebase'; 
import { notifySuccess, notifyError } from '../components/Toast';

const Profile = ({ user }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || '');
    const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || '');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!user) {
        return <div className="text-center py-20 text-xl font-semibold text-rose-600">User data not available. Please log in again.</div>;
    }

    const { displayName, email, photoURL } = user;

  
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const currentUser = auth.currentUser;

        if (!currentUser) {
            notifyError("Authentication failed. Please log in again.");
            setIsUpdating(false);
            return;
        }

        try {
            await updateProfile(currentUser, {
                displayName: newName,
                photoURL: newPhotoURL || null, 
            });
            await currentUser.reload();
            
            notifySuccess("Profile updated successfully!");
            setIsEditing(false); 
        } catch (error) {
            console.error("Profile update error:", error.message);
            notifyError("Failed to update profile: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    };
  
    const handleCancelEdit = () => {
        setIsEditing(false);
 
        setNewName(user.displayName || '');
        setNewPhotoURL(user.photoURL || '');
    };

    const ProfileDisplay = () => (
        <div className="p-8 md:p-12 text-center relative">
          
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-24">
                <div className="relative inline-block border-8 border-white rounded-full shadow-2xl">
                    {photoURL ? (
                        <img 
                            className="w-32 h-32 rounded-full object-cover" 
                            src={photoURL} 
                            alt={displayName || 'User'}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/f43f5e/ffffff?text=User"; }}
                        />
                    ) : (
                        <UserCircle className="w-32 h-32 text-rose-500" />
                    )}
           
                    <div className="absolute bottom-0 right-0 p-2 bg-rose-600 rounded-full text-white border-2 border-white cursor-default">
                        <Camera className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="pt-16">
          
                <h2 className="text-3xl font-extrabold text-gray-900 mb-1 mt-4 flex items-center justify-center">
                    <User className="w-6 h-6 mr-3 text-rose-500 hidden sm:inline-block" /> 
                    {displayName || "User Name Not Set"}
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 flex items-center justify-center">
                    <Mail className="w-5 h-5 mr-3 text-rose-500" /> 
                    {email}
                </p>
                
                <div className="space-y-4 pt-4 border-t border-rose-100">
                 
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full max-w-xs mx-auto flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01]"
                    >
                        <Edit className="w-5 h-5 mr-2" /> Update Profile
                    </button>

                    <div className="text-md text-gray-500 pt-2">
                        <p>Member since: **{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}**</p>
                    </div>
                </div>

            </div>
        </div>
    );
   
    const ProfileEditForm = () => (
        <div className="p-8 md:p-12 text-left relative">
            <h2 className="text-3xl font-bold text-rose-600 mb-6 font-serif border-b pb-3 border-rose-200">Edit Profile Details</h2>
            
            <form onSubmit={handleUpdate} className="space-y-6">
                
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                        <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                            placeholder="Your Name"
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150 shadow-sm"
                            disabled={isUpdating}
                        />
                    </div>
                </div>

                {/* Photo URL Field */}
                <div>
                    <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-2">Avatar Image URL (Optional)</label>
                    <div className="relative">
                        <Link className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="url"
                            id="photoURL"
                            name="photoURL"
                            value={newPhotoURL}
                            onChange={(e) => setNewPhotoURL(e.target.value)}
                            placeholder="Paste your image URL here"
                            className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150 shadow-sm"
                            disabled={isUpdating}
                        />
                    </div>
                    {newPhotoURL && (
                        <div className="mt-4 p-2 bg-rose-50 border border-rose-200 rounded-lg flex items-center">
                            <img src={newPhotoURL} alt="Preview" className="w-10 h-10 object-cover rounded-full mr-3" 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/f43f5e/ffffff?text=X"; }}
                            />
                            <span className="text-sm text-gray-600 truncate">Image Preview</span>
                        </div>
                    )}
                </div>

         
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address (Cannot be changed)</label>
                    <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-lg transition duration-150 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
                    >
                        {isUpdating ? 'Saving...' : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                    >
                        <X className="w-5 h-5 mr-2" /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[70vh]">
            
            <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-rose-200 overflow-hidden transform transition duration-500 hover:shadow-rose-400/50">
                
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-rose-600 to-pink-500 relative flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white font-serif tracking-wider mb-6">User Profile</h1>
                </div>

                {isEditing ? <ProfileEditForm /> : <ProfileDisplay />}
            </div>
        </div>
    );
};

export default Profile;