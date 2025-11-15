// src/components/Navbar.jsx

import React, { useState } from 'react';
// প্রয়োজনীয় আইকন ইমপোর্ট করা হয়েছে
import { LogIn, User, Menu, X, Home, LogOut, UserCircle } from 'lucide-react'; 

// --- DUMMY DATA/STATE FOR DEMO (Replace with real props from App.jsx) ---
// const Navbar = ({ isLoggedIn, user, onLogout }) => {
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // true/false করে টেস্ট করুন
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false); // Hover state for profile menu

  // Mock user data (for when isLoggedIn is true)
  const user = {
    displayName: 'Ayesha Khatun',
    photoURL: 'https://i.pravatar.cc/150?img=1', // Placeholder avatar URL
  };
  
  const logoText = "SkillSwap"; 

  // Dummy Logout function
  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false); // Set to false on logout
  };
  
  // Dummy Login/Signup click
  const handleAuthClick = (path) => {
    console.log(`Navigating to ${path}`);
    // In a real app, you would use navigate(path) here
    if (path === '/login') setIsLoggedIn(true); // Simulate login
  };
// ------------------------------------------------------------------------

  // Avatar Component with hover logic
  const UserProfileAvatar = () => (
    <div 
      className="relative flex items-center h-full transition duration-300"
      onMouseEnter={() => setIsProfileHovered(true)}
      onMouseLeave={() => setIsProfileHovered(false)}
    >
      {/* 1. Avatar Image/Icon */}
      {user.photoURL ? (
        <img 
          className="h-9 w-9 rounded-full object-cover border-2 border-rose-500 transition duration-300 transform hover:scale-110" 
          src={user.photoURL} 
          alt={user.displayName}
          title={user.displayName} // Tooltip on hover
        />
      ) : (
        <UserCircle className="h-9 w-9 text-rose-500 transition duration-300 transform hover:scale-110" title={user.displayName} />
      )}

      {/* 2. Display Name Tooltip/Menu (on hover) */}
      {isProfileHovered && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-rose-200 transition duration-300 transform translate-y-0 opacity-100">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b border-rose-100">
            {user.displayName}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-100 transition duration-150"
          >
            <LogOut className="w-4 h-4 mr-2 text-rose-500" /> Logout
          </button>
        </div>
      )}
    </div>
  );


  return (
    // Fixed Navbar, White background, Rose accents (Fixed: top-0, z-50)
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-rose-200 transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* ১. লোগো (বামদিকে - Left) */}
          <div className="flex-shrink-0 transition duration-300">
            <a href="/" className="text-2xl font-extrabold text-rose-600 tracking-wider hover:text-rose-700 hover:scale-105 transform transition duration-300">
              {logoText}
            </a>
          </div>

          {/* ২. নেভিগেশন লিঙ্কস (মাঝখানে - Center) */}
          <div className="hidden sm:flex flex-grow justify-center space-x-4 transition duration-300">
            
            {/* Home Link */}
            <a 
              href="/home" 
              className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
            >
              <Home className="w-4 h-4 mr-1 transition duration-300" /> Home
            </a>
            
            {/* My Profile Link (Always Visible as per requirement, but path may be protected) */}
            <a 
              href="/profile" 
              className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
            >
              <User className="w-4 h-4 mr-1 transition duration-300" /> My Profile
            </a>
            
          </div>
            
          {/* ৩. Auth/Profile Section (ডানদিকে - Right) */}
          <div className="hidden sm:flex flex-shrink-0 items-center space-x-3 transition duration-300">
            
            {isLoggedIn && user ? (
              <>
                {/* Logged In View: Avatar (with name on hover) + Logout Button */}
                <UserProfileAvatar />
              </>
            ) : (
              <>
                {/* Logged Out View: Login & Signup Buttons */}
                <button 
                  onClick={() => handleAuthClick('/login')}
                  className="flex items-center text-rose-600 hover:text-white hover:bg-rose-500 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 border border-rose-500"
                >
                  <LogIn className="w-5 h-5 mr-2 transition duration-300" /> Login
                </button>
                <button 
                  onClick={() => handleAuthClick('/signup')}
                  className="flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Signup
                </button>
              </>
            )}

          </div>
          
          {/* মোবাইল মেনু বাটন (Mobile View) */}
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-rose-600 hover:text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 transition duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6 transition duration-300" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6 transition duration-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু ড্রপডাউন (Mobile Menu Items) */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-rose-200 transition duration-300" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
             <a 
                href="/home" 
                className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
              >
                <Home className="w-4 h-4 mr-2" /> Home
              </a>
              <a 
                href="/profile" 
                className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
              >
                <User className="w-4 h-4 mr-2" /> My Profile
              </a>

              {/* Mobile Auth Buttons */}
              {isLoggedIn ? (
                  <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-md transition duration-300 ease-in-out"
                  >
                      <LogOut className="w-5 h-5 mr-2" /> Logout
                  </button>
              ) : (
                  <>
                      <button 
                          onClick={() => handleAuthClick('/login')}
                          className="w-full text-left flex items-center text-rose-600 hover:text-white hover:bg-rose-500 font-semibold py-2 px-3 rounded-md transition duration-300 ease-in-out border border-rose-500"
                      >
                          <LogIn className="w-5 h-5 mr-2" /> Login
                      </button>
                      <button 
                          onClick={() => handleAuthClick('/signup')}
                          className="w-full text-left flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-md transition duration-300 ease-in-out"
                      >
                          Signup
                      </button>
                  </>
              )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;