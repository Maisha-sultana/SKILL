// src/components/Navbar.jsx (Updated to use Profile Dropdown)

import React, { useState } from 'react';
import { LogIn, User, Menu, X, Home, Info, Mail, LogOut, UserCircle } from 'lucide-react'; 

// 🎯 FIX: Rely entirely on props (isLoggedIn, user, onLogout)
const Navbar = ({ isLoggedIn = false, user = null, onLogout = () => {} }) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 🎯 New State: Controls the profile dropdown visibility
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); 
  
  const effectiveUser = user || { displayName: 'User', photoURL: 'https://i.pravatar.cc/150?img=1' };
  
  const logoText = "SkillSwap"; 

  // This calls the handleLogout function passed from App.jsx
  const handleLogout = () => {
    onLogout(); 
    setIsProfileDropdownOpen(false); // Close dropdown on logout
  };
  
  const UserProfileAvatar = () => (
    <div 
      className="relative flex items-center h-full transition duration-300 cursor-pointer"
      // Toggle dropdown on click
      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
    >
      {/* Avatar Image/Icon */}
      {effectiveUser.photoURL ? (
        <img 
          className="h-9 w-9 rounded-full object-cover border-2 border-rose-500 transition duration-300 transform hover:scale-110" 
          src={effectiveUser.photoURL} 
          alt={effectiveUser.displayName}
          title={`Click to open menu`} 
        />
      ) : (
        <UserCircle className="h-9 w-9 text-rose-500 transition duration-300 transform hover:scale-110" title={`Click to open menu`} />
      )}

      {/* 🎯 Dropdown Menu */}
      {isProfileDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-rose-200 transition duration-300">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b border-rose-100 truncate">
            {effectiveUser.displayName}
          </div>
          
          <a
            href="/profile"
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-100 transition duration-150"
            onClick={() => setIsProfileDropdownOpen(false)} // Close on navigation
          >
            <User className="w-4 h-4 mr-2 text-rose-500" /> My Profile
          </a>

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
    <nav className="w-full bg-white shadow-md border-b border-rose-200 transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section (Left) */}
          <div className="flex-shrink-0 transition duration-300">
            <a href="/" className="text-2xl font-extrabold text-rose-600 tracking-wider hover:text-rose-700 hover:scale-105 transform transition duration-300">
              {logoText}
            </a>
          </div>

          {/* Navigation Links (Center) - Removed About link as it wasn't requested */}
          <div className="hidden sm:flex flex-grow justify-center space-x-2 md:space-x-4 transition duration-300">
            <a href="/home" className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300">
              <Home className="w-4 h-4 mr-1 transition duration-300" /> Home
            </a>
            
          </div>
            
          {/* Auth/Profile Section (Right) */}
          <div className="hidden sm:flex flex-shrink-0 items-center space-x-3 transition duration-300">
            
            {isLoggedIn ? ( 
              <UserProfileAvatar /> // Only the dropdown Avatar is shown when logged in
            ) : (
              <>
                {/* Shows Login/Signup when false */}
                <a
                  href="/login"
                  className="flex items-center text-rose-600 hover:text-white hover:bg-rose-500 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 border border-rose-500"
                >
                  <LogIn className="w-5 h-5 mr-2 transition duration-300" /> Login
                </a>
                <a
                  href="/signup"
                  className="flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Signup
                </a>
              </>
            )}

          </div>
          
          {/* ... Mobile Menu Logic (using isLoggedIn prop) ... */}
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
             <a href="/home" className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300">
                <Home className="w-4 h-4 mr-2" /> Home
              </a>
             
              
              {isLoggedIn ? (
                  <>
                      <a href="/profile" className="text-gray-800 hover:bg-rose-100 hover:text-rose-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300">
                          <User className="w-4 h-4 mr-2" /> My Profile
                      </a>
                      {/* Logout button in mobile menu */}
                      <button onClick={handleLogout} className="w-full text-left flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-md transition duration-300 ease-in-out">
                          <LogOut className="w-5 h-5 mr-2" /> Logout
                      </button>
                  </>
              ) : (
                  <>
                      <a href="/login" className="w-full text-left flex items-center text-rose-600 hover:text-white hover:bg-rose-500 font-semibold py-2 px-3 rounded-md transition duration-300 ease-in-out border border-rose-500">
                          <LogIn className="w-5 h-5 mr-2" /> Login
                      </a>
                      <a href="/signup" className="w-full text-left flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 rounded-md transition duration-300 ease-in-out">
                          Signup
                      </a>
                  </>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;