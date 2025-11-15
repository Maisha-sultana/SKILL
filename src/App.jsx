// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css'; 

// Components (Lazy loading for better performance)
const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const Home = React.lazy(() => import('./pages/Home')); 

// Dummy Pages for routing links
const Login = () => <h2 className="text-3xl text-rose-700 py-20 text-center">Login Page Content</h2>;
const Profile = () => <h2 className="text-3xl text-rose-700 py-20 text-center">Profile Page Content</h2>;
const Signup = () => <h2 className="text-3xl text-rose-700 py-20 text-center">Signup Page Content</h2>;
const About = () => <h2 className="text-3xl text-rose-700 py-20 text-center">About Page Content</h2>;
const Contact = () => <h2 className="text-3xl text-rose-700 py-20 text-center">Contact Page Content</h2>;


function App() {
  
  return (
    <Router>
        <React.Suspense fallback={<div className="text-center py-20 text-xl text-rose-600">Loading App...</div>}>
            
            {/* Removed fixed padding. Added flex-col min-h-screen for sticky footer. */}
            <div className="flex flex-col min-h-screen bg-rose-50 text-gray-800"> 
                
                {/* Navbar (Now Static/Relative) */}
                <Navbar />
                
                {/* Main Content Area: flex-grow ensures it fills available space */}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>

                {/* Footer (Now Static/Relative) */}
                <Footer/>
            </div>

        </React.Suspense>
    </Router>
  );
}

export default App;