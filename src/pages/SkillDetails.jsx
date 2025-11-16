// src/pages/SkillDetails.jsx (Clean, Modern Card Design)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, DollarSign, Mail, User, Clock, CheckCircle, Tag } from 'lucide-react';
import { notifySuccess } from '../components/Toast'; 

const initialFormState = {
    name: '',
    email: ''
};

const SkillDetails = ({ allSkills }) => {
    const { skillId } = useParams();
    const [skill, setSkill] = useState(null);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        const selectedSkill = allSkills.find(s => s.skillId === parseInt(skillId));
        setSkill(selectedSkill);
    }, [skillId, allSkills]);

    if (!skill) {
        return <div className="text-center py-20 text-xl font-semibold text-rose-600">Skill not found or loading...</div>;
    }

    // --- Form Handlers ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Success Toast দেখানো
        notifySuccess(`Session booked with ${skill.providerName}! We will contact you at ${formData.email}.`);
        
        // 2. ফর্ম ক্লিয়ার করা
        setFormData(initialFormState);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* New Main Container - Elevated Card Look with clear separation */}
            <div className="bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden">
                
                {/* 1. TOP HEADER SECTION (Skill Name & Category) */}
                <div className="p-6 md:p-10 bg-rose-50 border-b-4 border-rose-300">
                    <div className="flex items-center text-xl text-rose-700 font-semibold mb-2">
                        <Tag className="w-5 h-5 mr-2" /> {skill.category}
                    </div>
                    {/* Title color fixed via index.css change */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-2 font-serif leading-tight">
                        {skill.skillName}
                    </h1>
                </div>

                {/* 2. MAIN BODY GRID (Details 60% vs. Form 40%) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-rose-100">
                    
                    {/* LEFT COLUMN (Details & Image) - 3/5 width */}
                    <div className="lg:col-span-3 p-8 md:p-10">
                        
                        {/* Image Card (Cleanly embedded) */}
                        <div className="w-full h-80 mb-8 rounded-xl overflow-hidden shadow-lg border border-rose-200">
                             <img 
                                src={skill.image} 
                                alt={skill.skillName} 
                                // Image will cover the space, adjusted for better aesthetics
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/800x600?text=${skill.skillName}`; }}
                            />
                        </div>

                        {/* Key Metrics Row */}
                        <div className="flex flex-wrap items-center justify-around p-4 mb-8 rounded-lg bg-rose-100/50 shadow-inner">
                            <div className="text-center">
                                <p className="text-3xl font-extrabold text-rose-600">
                                    <DollarSign className="w-6 h-6 inline-block" />{skill.price}
                                </p>
                                <span className="text-sm text-gray-600">Price / Hour</span>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-extrabold text-amber-500">
                                    <Star className="w-6 h-6 inline-block fill-current" />{skill.rating}
                                </p>
                                <span className="text-sm text-gray-600">Rating</span>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-extrabold text-gray-700">
                                    <Clock className="w-6 h-6 inline-block text-rose-400" />{skill.slotsAvailable}
                                </p>
                                <span className="text-sm text-gray-600">Slots Available</span>
                            </div>
                        </div>

                        {/* Skill Description */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 font-serif border-b pb-2 border-rose-100">Course Overview</h2>
                        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                            {skill.description}
                        </p>
                        
                        {/* Provider Info Card */}
                        <div className="mt-8 p-6 bg-rose-100 rounded-xl shadow-md border border-rose-200">
                            <h3 className="text-xl font-bold text-rose-700 mb-4 font-serif flex items-center">
                                <User className="w-5 h-5 mr-3" /> Provider Details
                            </h3>
                            <div className="space-y-2 text-gray-800">
                                <p className="flex items-center text-lg font-medium">
                                    <CheckCircle className="w-4 h-4 mr-3 text-green-500" /> {skill.providerName} (Verified Expert)
                                </p>
                                <p className="flex items-center text-lg">
                                    <Mail className="w-4 h-4 mr-3 text-rose-500" /> Contact: {skill.providerEmail}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Booking Form) - 2/5 width */}
                    <div className="lg:col-span-2 p-8 md:p-10 bg-rose-50">
                        <h2 className="text-3xl font-bold text-rose-700 mb-6 font-serif border-b pb-3 border-rose-200">Book Your Session</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-2">Your Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Alex Martin"
                                    className="w-full p-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150 shadow-sm"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-2">Your Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., you@gmail.com"
                                    className="w-full p-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150 shadow-sm"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-rose-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-rose-700 transition duration-300 transform hover:scale-[1.01] active:scale-95 mt-4 flex items-center justify-center"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" /> Confirm Book Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillDetails;