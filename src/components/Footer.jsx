// src/components/Footer.jsx

import React from 'react';
// প্রয়োজনীয় আইকন ইমপোর্ট করা হয়েছে
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    // Fixed Bottom and light pink theme applied (bg-rose-200, text-gray-800)
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-rose-200 border-t border-rose-300 shadow-lg p-4 md:p-6 lg:p-8 text-gray-800 h-[140px] md:h-[150px] transition-transform duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto"> 
        
        {/* Footer Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          
          {/* 1. Contact Info (Required) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-2 text-rose-700">Contact</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-rose-700" />
                <a href="mailto:support@skillswap.com" className="hover:text-rose-500 transition duration-300">support@skillswap.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-rose-700" />
                <span>+880 1XXXXXXXXX</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-rose-700 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
          
          {/* 2. Legal & Policy (Required) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-2 text-rose-700">Legal & Policy</h3>
            <ul className="space-y-1 text-gray-700">
              <li><a href="/privacy" className="hover:text-rose-500 transition duration-300">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-rose-500 transition duration-300">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-rose-500 transition duration-300">Cookie Policy</a></li>
            </ul>
          </div>
          
          {/* 3. Quick Links (Utility) */}
          <div className="hidden md:block col-span-1">
            <h3 className="text-base font-semibold mb-2 text-rose-700">Quick Links</h3>
            <ul className="space-y-1 text-gray-700">
              <li><a href="/faq" className="hover:text-rose-500 transition duration-300">FAQ</a></li>
              <li><a href="/career" className="hover:text-rose-500 transition duration-300">Careers</a></li>
              <li><a href="/support" className="hover:text-rose-500 transition duration-300">Support</a></li>
            </ul>
          </div>

          {/* 4. Social Links (Required) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-2 text-rose-700">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Added Scale-on-hover effect for flair and pink hover color */}
              <a href="https://facebook.com/SkillSwapBD" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-rose-600 transition duration-300 transform hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/SkillSwapGlobal" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-rose-600 transition duration-300 transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/SkillSwap" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-rose-600 transition duration-300 transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              {/* YouTube Link Added with red hover color */}
              <a href="https://youtube.com/@SkillSwap" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-500 transition duration-300 transform hover:scale-110">
                <Youtube className="w-6 h-6" />
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