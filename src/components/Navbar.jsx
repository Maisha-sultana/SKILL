import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleAuthClick = () => setIsLoggedIn(!isLoggedIn);

  return (
    // Fixed container, top layer, dark background
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg border-b border-indigo-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-2xl font-extrabold tracking-wider text-white hover:text-indigo-400 transition duration-300"
            >
              SkillSwap
            </a>
          </div>

          {/* Main Navigation Links (Center) - Desktop */}
          {/* We use flex-grow and justify-center to push this section to the horizontal center */}
          <div className="hidden md:flex flex-grow justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.link} // Simple link reference
                className='px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition duration-300' 
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth Button (Right) - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleAuthClick}
              className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 flex items-center shadow-md"
            >
              {isLoggedIn ? (
                <>
                  <User className="w-4 h-4 mr-2" /> My Profile
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md transition duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              onClick={toggleMenu}
              className='block text-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300'
            >
              {link.name}
            </a>
          ))}
           <button 
              onClick={() => {handleAuthClick(); toggleMenu();}}
              className="w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 flex items-center justify-center mt-2"
            >
              {isLoggedIn ? (
                <>
                  <User className="w-5 h-5 mr-2" /> My Profile
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" /> Login
                </>
              )}
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;