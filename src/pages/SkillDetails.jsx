// src/pages/SkillDetails.jsx 

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { notifySuccess } from '../components/Toast'; // Removed
import { Star, DollarSign, Mail, User, Clock } from 'lucide-react';

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
        
        // 1. Success Toast দেখানো (Replaced notifySuccess with alert)
        alert(`SUCCESS: Session booked with ${skill.providerName}! We will contact you at ${formData.email}.`);
        
        // 2. ফর্ম ক্লিয়ার করা
        setFormData(initialFormState);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-rose-300">
                
                {/* Image and Primary Info */}
                <div className="md:flex">
                    <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
                        <img 
                            src={skill.image} 
                            alt={skill.skillName} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/800x600?text=${skill.skillName}`; }}
                        />
                    </div>
                    
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 font-serif">{skill.skillName}</h1>
                            <p className="text-lg text-gray-600 mb-6">{skill.description}</p>
                            
                            <div className="space-y-3 text-gray-700">
                                <p className="flex items-center text-xl font-bold text-rose-600">
                                    <DollarSign className="w-6 h-6 mr-2" /> {skill.price} / hour
                                </p>
                                <p className="flex items-center text-amber-500 font-semibold">
                                    <Star className="w-5 h-5 mr-2 fill-current" /> {skill.rating} Rating
                                </p>
                                <p className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-rose-400" /> {skill.slotsAvailable} Slots Available
                                </p>
                            </div>
                        </div>

                        {/* Provider Info */}
                        <div className="mt-8 pt-4 border-t border-rose-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Provider Details</h3>
                            <p className="flex items-center text-gray-700">
                                <User className="w-4 h-4 mr-2 text-rose-500" /> {skill.providerName}
                            </p>
                            <p className="flex items-center text-gray-700">
                                <Mail className="w-4 h-4 mr-2 text-rose-500" /> {skill.providerEmail}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Booking Form Section */}
                <div className="p-8 bg-rose-50 border-t border-rose-200">
                    <h2 className="text-3xl font-bold text-rose-700 mb-6 font-serif">Book Session</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-1">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">Your Email (Gmail recommended)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition duration-150"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-rose-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-rose-700 transition duration-300 transform hover:scale-[1.01] active:scale-95"
                        >
                            Confirm Book Session
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SkillDetails;