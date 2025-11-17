// src/App.jsx (Final Integrated Code - Profile Fix)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // Import Firebase Auth


// 🎯 Toast Imports (Assuming react-toastify setup is correct)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { notifySuccess, notifyError } from './components/Toast'; 

import './App.css'; 

// Components (Lazy loading for better performance)
const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const Home = React.lazy(() => import('./pages/Home')); 
const Login = React.lazy(() => import('./pages/Login')); 
const SkillDetails = React.lazy(() => import('./pages/SkillDetails')); 
const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute')); 
const Signup = React.lazy(() => import('./pages/Signup')); 
// 🎯 New: Import Profile page
const Profile = React.lazy(() => import('./pages/Profile')); 
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));


// --- DUMMY/FETCHED SKILL DATA (Used for SkillDetails Page) ---
const skillData = [
  { "skillId": 1, "skillName": "Advanced React Hooks & Context", "providerName": "Nadia Akhter", "providerEmail": "nadia.a@skillswap.com", "price": 35, "rating": 4.9, "slotsAvailable": 2, "description": "Master complex state management, custom hooks, and context API for scalable React apps.", "image": "https://miro.medium.com/1*jBsXkCIbVy9S_HuWOFfK7w.png", "category": "Programming" },
  { "skillId": 2, "skillName": "Professional Photo Editing (Adobe Photoshop)", "providerName": "Imran Khan", "providerEmail": "imran.k@skillswap.com", "price": 25, "rating": 4.7, "slotsAvailable": 4, "description": "Learn retouching, color correction, and graphic manipulation techniques from a pro.", "image": "https://i.ytimg.com/vi/WGMDXOr4LmI/maxresdefault.jpg", "category": "Design" },
  { "skillId": 3, "skillName": "Beginner Acoustic Guitar Lessons", "providerName": "Alex Martin", "providerEmail": "alex.m@skillswap.com", "price": 20, "rating": 4.8, "slotsAvailable": 3, "description": "Learn chords, strumming, and basic songs on the acoustic guitar for complete beginners.", "image": "https://acousticlife.tv/wp-content/uploads/2019/07/how-to-play-acoustic-guitar.jpg", "category": "Music" },
  { "skillId": 4, "skillName": "Beginner Digital Marketing & SEO Basics", "providerName": "Tariq Mahmud", "providerEmail": "tariq.m@skillswap.com", "price": 30, "rating": 4.8, "slotsAvailable": 3, "description": "Foundational course on search engine optimization, content marketing, and strategy.", "image": "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/342486567/original/1ca110bd7bc2419501d84332e3f9328e5a8fa9e5/do-the-best-digital-marketing-for-you.png", "category": "Business" },
  { "skillId": 5, "skillName": "Creative Home Baking (Breads & Cakes)", "providerName": "Shormi Islam", "providerEmail": "shormi.i@skillswap.com", "price": 30, "rating": 4.8, "slotsAvailable": 3, "description": "Master easy recipes for sourdough, quick breads, and decorative homemade cakes.", "image": "https://images.squarespace-cdn.com/content/v1/5a51221e8a02c7e65800f1b7/1642106317067-IF92RLR85D94NHBV5D1N/earl+grey+and+cardamom+banana+bread-12.jpg?format=1000w", "category": "Culinary" },
  { "skillId": 6, "skillName": "Mastering Excel: Data Analysis & Pivot Tables", "providerName": "Rajib Hasan", "providerEmail": "rajib.h@skillswap.com", "price": 22, "rating": 4.6, "slotsAvailable": 7, "description": "Comprehensive guide to Excel functions, data validation, and powerful pivot table creation.", "image": "https://img-c.udemycdn.com/course/750x422/4518096_96fe_4.jpg", "category": "Software" },
  { "skillId": 7, "skillName": "Watercolor Painting for Stress Relief", "providerName": "Shanti Roy", "providerEmail": "shanti.r@skillswap.com", "price": 20, "rating": 4.9, "slotsAvailable": 5, "description": "Relaxing art sessions to learn basic watercolor techniques and color mixing.", "image": "https://i.ytimg.com/vi/GWB_fCpf9kI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA6RkGxxPm5wK6SpqQXJ1w", "category": "Art" },
  { "skillId": 8, "skillName": "Introduction to Python Programming", "providerName": "Zahid Islam", "providerEmail": "zahid.i@skillswap.com", "price": 28, "rating": 4.4, "slotsAvailable": 8, "description": "Basic Python syntax, control flow, and introduction to object-oriented programming.", "image": "https://uploads.teachablecdn.com/attachments/ok80CgavTDGPftc0kXfk_Learn+Python+for+Beginners.jpg", "category": "Programming" }
];
// ----------------------------------


// 1. Component to hold the hooks and application logic (must be inside <Router>)
function AppContent() {
    // Hooks MUST be inside a component that is a child of <Router>
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate(); 

    // Logout Function
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login'); 
            // Replaced notifySuccess with alert()
            notifySuccess("Logged out successfully!"); 
        } catch (err) {
            console.error("Logout error:", err);
            notifyError("Logout failed!");
        }
    };
    
    // Prepare props for Navbar and ProtectedRoute
    const isLoggedIn = !!user;
    const userInfo = user ? {
        displayName: user.displayName || 'User',
        photoURL: user.photoURL || 'default-avatar.png', 
    } : null; 

    // Placeholder pages for other routes
    // const Profile = () => <h2 className="text-3xl text-rose-700 py-20 text-center">User Profile Page</h2>; ❌ Placeholder Removed
    // const Signup = () => <h2 className="text-3xl text-rose-700 py-20 text-center">Signup Page</h2>;
    const About = () => <h2 className="text-3xl text-rose-700 py-20 text-center">About Page</h2>;
    const Contact = () => <h2 className="text-3xl text-rose-700 py-20 text-center">Contact Page</h2>;

    return (
        <React.Suspense fallback={<div className="text-center py-20 text-xl text-rose-600">Loading App...</div>}>
            
            <div className="flex flex-col min-h-screen bg-rose-50 text-gray-800"> 
                
                {/* Navbar receives Auth Props */}
                <Navbar isLoggedIn={isLoggedIn} user={userInfo} onLogout={handleLogout} />
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn} loading={loading} />} />
                        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} loading={loading} />} />
                        
                        {/* Login Page receives isLoggedIn state */}
                        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
                        {/* Signup uses the dedicated component */}
                        <Route path="/signup" element={<Signup />} /> 
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />

                        <Route path="/forget-password" element={<ForgotPassword />} />
                        
                        {/* Protected Skill Details Page */}
                        <Route 
                            path="/skill/:skillId" 
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                                    <SkillDetails allSkills={skillData} /> 
                                </ProtectedRoute>
                            } 
                        />

                        {/* Protected Profile Route 🎯 Passes the active user object */}
                         <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                                    <Profile user={user} />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>

                <Footer/>
                <ToastContainer /> 
            </div>

        </React.Suspense>
    );
}

// 2. Main App component only renders the Router and AppContent
function App() {
  return (
    <Router>
        <AppContent /> 
    </Router>
  );
}

export default App;