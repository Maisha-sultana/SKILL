// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper Styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
// Swiper Modules
import { Autoplay, FreeMode } from 'swiper/modules';

// Lucide-react icons for visual flair
import { Star, DollarSign, Eye } from 'lucide-react';

const Home = () => {
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

    if (isLoading) {
        return <div className="text-center py-20 text-xl font-semibold text-rose-600">Loading skills data...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl font-semibold text-red-600">Error fetching data: {error}</div>;
    }

    return (
        <div className="py-0 md:py-4">
            
            {/* ======================================================= */}
            {/* 1. HERO SLIDER SECTION (Image Carousel - Continuous & Hover) */}
            {/* ======================================================= */}
            <header className="mb-8 pt-4 md:pt-8">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center pb-6">
                    <span 
                        // Gradient: Rose to Pink-Purple
                        className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-pink-500 transition duration-500"
                    >
                        Explore Top Skills & Knowledge
                    </span>
                </h1>
            </header>
            
            <div className="shadow-2xl rounded-xl overflow-hidden border border-rose-300 mb-12">
                <Swiper
                    slidesPerView={1.5}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true} 
                    speed={4000} // Continuous movement speed
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
                    {/* Map data twice for a better seamless loop */}
                    {[...skills, ...skills].map((skill, index) => (
                        <SwiperSlide key={`${skill.skillId}-${index}`} className="flex items-center">
                            {/* Card with Image and Hover Transition */}
                            <div className="group relative w-full h-full rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.05] hover:shadow-rose-500/50">
                                
                                {/* Image */}
                                <img 
                                    src={skill.image} 
                                    alt={skill.skillName} 
                                    className="w-full h-full object-cover transition duration-500 transform group-hover:scale-110"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x400?text="+skill.category; }}
                                />
                                
                                {/* Overlay Text */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 transition duration-300 group-hover:bg-opacity-70">
                                    <h3 className="text-xl font-bold text-white leading-tight">
                                        {skill.skillName}
                                    </h3>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            {/* ======================================================= */}
            {/* 2. POPULAR SKILLS SECTION (Cards) */}
            {/* ======================================================= */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Popular Skills</h2>
                
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
                                
                                {/* View Details Button */}
                                <button 
                                    className="w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition duration-300 flex items-center justify-center mt-auto transform hover:scale-[1.02] active:scale-95"
                                >
                                    <Eye className="w-5 h-5 mr-2" /> View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Spacer for bottom */}
                <div className="h-10"></div> 
            </div>
            
        </div>
    );
};

export default Home;