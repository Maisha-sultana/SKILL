import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    // 'fixed bottom-0' keeps the footer fixed at the bottom
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-indigo-500/30 shadow-xl p-4 md:p-6 lg:p-8 text-white h-[140px] md:h-[150px]">
      <div className="max-w-7xl mx-auto overflow-y-auto h-full">
        
        {/* Footer Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          
          {/* 1. Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-2 text-indigo-400">Contact</h3>
            <ul className="space-y-1 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-indigo-400" />
                <a href="mailto:support@skillswap.com" className="hover:text-white transition duration-300">support@skillswap.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-indigo-400" />
                <span>+880 1XXXXXXXXX</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-indigo-400 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
          
          {/* 2. Legal & Policy */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-2 text-indigo-400">Legal & Policy</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition duration-300">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-white transition duration-300">Cookie Policy</a></li>
            </ul>
          </div>
          
          {/* 3. Quick Links */}
          <div className="hidden md:block col-span-1">
            <h3 className="text-base font-semibold mb-2 text-indigo-400">Quick Links</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="/faq" className="hover:text-white transition duration-300">FAQ</a></li>
              <li><a href="/career" className="hover:text-white transition duration-300">Careers</a></li>
              <li><a href="/support" className="hover:text-white transition duration-300">Support</a></li>
            </ul>
          </div>

          {/* 4. Social Links */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-2 text-indigo-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2 md:mt-4">
        &copy; {new Date().getFullYear()} SkillSwap Global. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;