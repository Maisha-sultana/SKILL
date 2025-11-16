// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper Styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Swiper Modules (Pagination and Navigation added)
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';

// Lucide-react icons for visual flair
import { Star, DollarSign, Eye, Users, Search, Calendar, CheckCircle } from 'lucide-react';

// --- STATIC DATA: Top Rated Providers ---
const topProviderData = [
    { id: 1, name: 'Nadia Akhter', skill: 'Advanced React Dev', rating: 4.9, reviews: 150, avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: 2, name: 'Imran Khan', skill: 'Photo Editing', rating: 4.7, reviews: 112, avatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 3, name: 'Alex Martin', skill: 'Acoustic Guitar', rating: 4.8, reviews: 95, avatar: 'https://i.pravatar.cc/150?img=50' },
    { id: 4, name: 'Rina Begum', skill: 'Bengali Cooking', rating: 5.0, reviews: 205, avatar: 'https://i.pravatar.cc/150?img=70' },
    // More data for carousel
    { id: 5, name: 'Tariq Mahmud', skill: 'Digital Marketing', rating: 4.6, reviews: 88, avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 6, name: 'Zahid Islam', skill: 'Python Programming', rating: 4.4, reviews: 130, avatar: 'https://i.pravatar.cc/150?img=11' },
];

// --- STATIC DATA: How It Works Steps (Updated for Swap theme) ---
const howItWorksSteps = [
    { id: 1, title: 'Discover Your Need', description: 'Search our library for the specific skill you need to master or exchange a service for.', icon: Search },
    { id: 2, title: 'Connect & Schedule', description: 'Match with a verified provider or peer and schedule your session instantly.', icon: Calendar },
    { id: 3, title: 'Swap Knowledge', description: 'Attend the session, master the skill, and leave a rating for the successful exchange!', icon: CheckCircle },
];


// 🎯 Home component now accepts isLoggedIn prop from App.jsx
const Home = ({ isLoggedIn }) => {
    const navigate = useNavigate(); // Hook for navigation
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data from public/skills.json
    useEffect(() => {
        fetch('/skills.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch skill data: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setSkills(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    // 🎯 HANDLER FOR VIEW DETAILS BUTTON (Protected)
    const handleViewDetails = (skillId) => {
        if (isLoggedIn) {
            navigate(`/skill/${skillId}`); // Go to protected details page
        } else {
            // Save path and redirect to login
            sessionStorage.setItem('redirectPath', `/skill/${skillId}`);
            navigate('/login');
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-xl font-semibold text-rose-600">Loading skills data...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl font-semibold text-red-600">Error fetching data: {error}</div>;
    }

    return (
        <div className="py-0 md:py-4">
            
            {/* ... 1. HERO SLIDER SECTION ... */}
            <header className="mb-12 pt-4 md:pt-8">
                <h1 className="text-5xl md:text-7xl font-extrabold text-center pb-6 font-serif">
                    <span 
                        className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-pink-500 transition duration-500"
                    >
                        Explore Top Skills & Knowledge
                    </span>
                </h1>
            </header>
            
            {/* Swiper Container */}
            <div className="shadow-2xl rounded-xl overflow-hidden border border-rose-300 mb-20">
                <Swiper
                    slidesPerView={1.5}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true} 
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        reverseDirection: false,
                    }}
                    modules={[Autoplay, FreeMode]}
                    className="image-skill-slider h-56 md:h-72"
                    breakpoints={{
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4.5, spaceBetween: 25 },
                    }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <SwiperSlide key={`${skill.skillId}-${index}`} className="flex items-center">
                            <div className="group relative w-full h-full rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.05] hover:shadow-rose-500/50">
                                
                                <img 
                                    src={skill.image} 
                                    alt={skill.skillName} 
                                    className="w-full h-full object-cover transition duration-500 transform group-hover:scale-110"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x400?text="+skill.category; }}
                                />
                                
                                {/* Text Container with Bottom Gradient for contrast */}
                                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition duration-300">
                                    <h3 className="text-xl font-bold text-white leading-tight">
                                        {skill.skillName}
                                    </h3>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            {/* 2. POPULAR SKILLS SECTION (Cards) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center font-serif drop-shadow-lg">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-pink-500 transition duration-500">
                        Popular Skills
                    </span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {skills.map(skill => (
                        <div key={skill.skillId} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-xl border border-rose-100 transform hover:shadow-2xl hover:border-rose-300 hover:-translate-y-1 transition duration-500">
                            
                            {/* Card Image */}
                            <div className="h-40 bg-rose-50 flex items-center justify-center overflow-hidden">
                                <img 
                                    src={skill.image} 
                                    alt={skill.skillName} 
                                    className="w-full h-full object-cover transition duration-500 transform hover:scale-105"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x200?text="+skill.category; }}
                                />
                            </div>
                            
                            {/* Card Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={skill.skillName}>
                                    {skill.skillName}
                                </h3>
                                
                                {/* Rating and Price */}
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="flex items-center text-amber-500 font-semibold">
                                        <Star className="w-4 h-4 mr-1" fill="currentColor" /> {skill.rating}
                                    </span>
                                    <span className="flex items-center text-rose-600 font-extrabold text-lg">
                                        <DollarSign className="w-5 h-5 mr-1" />{skill.price}
                                    </span>
                                </div>
                                
                                {/* View Details Button - Calls handleViewDetails */}
                                <button 
                                    onClick={() => handleViewDetails(skill.skillId)}
                                    className="w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition duration-300 flex items-center justify-center mt-auto transform hover:scale-[1.02] active:scale-95"
                                >
                                    <Eye className="w-5 h-5 mr-2" /> View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. TOP RATED PROVIDERS SECTION (SWIPER CAROUSEL) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center font-serif drop-shadow-lg">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-700 transition duration-500">
                        Top Rated Providers
                    </span>
                </h2>
                
                {/* Provider Swiper Wrapper */}
                <div className="provider-swiper-container pb-12">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper h-auto"
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 40 },
                            1280: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                    >
                        {topProviderData.map(provider => (
                            <SwiperSlide key={provider.id}>
                                {/* Provider Card Design */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-rose-100 text-center transform hover:shadow-xl hover:border-rose-400 transition duration-500 hover:-translate-y-1">
                                    <img 
                                        src={provider.avatar} 
                                        alt={provider.name} 
                                        className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-4 border-rose-300 transition duration-300 transform hover:scale-105"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 truncate">{provider.name}</h3>
                                    <p className="text-sm text-rose-600 font-semibold mb-2">{provider.skill}</p>
                                    <div className="flex justify-center items-center text-sm text-gray-600">
                                        <Star className="w-4 h-4 mr-1 text-amber-500 fill-current" />
                                        <span>{provider.rating} ({provider.reviews} Reviews)</span>
                                    </div>
                                    <button className="mt-4 bg-rose-500 text-white py-1 px-4 rounded-full text-sm hover:bg-rose-600 transition duration-300 transform hover:scale-105">
                                        View Profile
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* 4. HOW IT WORKS SECTION */}
            <div className="max-w-full bg-rose-200 py-20 transform skew-y-2 border-y-4 border-rose-300 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform -skew-y-2">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center font-serif drop-shadow-lg">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-pink-500 transition duration-500">
                            How It Works
                        </span>
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {howItWorksSteps.map(step => {
                            const Icon = step.icon; // Get the Lucide icon component
                            return (
                                <div key={step.id} className="text-center p-8 bg-white rounded-xl shadow-2xl border-2 border-rose-300 transform transition duration-500 hover:scale-[1.02]">
                                    <div className="group mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-rose-600 text-white shadow-xl transition duration-300 transform hover:rotate-6">
                                        <Icon className="w-8 h-8"/>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.id}. {step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Spacer for bottom */}
            <div className="h-10"></div> 
            
        </div>
    );
};

export default Home;