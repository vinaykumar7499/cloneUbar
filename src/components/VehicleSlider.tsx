
'use client';

// 1. React aur UI tools import kiye
import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Bike, Bus, Car, CarTaxiFront, Truck, ChevronRight, ChevronLeft } from 'lucide-react';

// 2. Vehicle Categories ka data (Icons ke sath)
const VEHICLE_CATEGORIES = [
    { title: "All Vehicles", desc: "Browse the full fleet", Icon: CarTaxiFront, tag: "Popular" },
    { title: "Bikes", desc: "Fast & affordable rides", Icon: Bike, tag: "Quick" },
    { title: "Cars", desc: "Comfortable city travel", Icon: Car, tag: "Comfort" },
    { title: "SUVs", desc: "Premium & spacious", Icon: Car, tag: "Premium" },
    { title: "Vans", desc: "Family & group transport", Icon: Bus, tag: "Family" },
    { title: "Trucks", desc: "Heavy & commercial transport", Icon: Truck, tag: "Cargo" }
];

const VehicleSlider = () => {
    // 3. Selected Category aur Slider reference state
    const [selectedCategory, setSelectedCategory] = useState("All Vehicles");
    const sliderRef = useRef<HTMLDivElement>(null);

    // 4. Left & Right Buttons se slider scroll karne ka function
    const handleScroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='w-full bg-white py-20 px-4 sm:px-8 md:px-12 overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className='flex items-end justify-between mb-10'
                >
                    {/* Left: Heading & Underline */}
                    <div>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='h-px w-8 bg-zinc-900' />
                            <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>Fleet</span>
                        </div>

                        <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 leading-none'>
                            Vehicles
                            <br />
                            <span className='relative inline-block mt-1'>
                                Categories
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className='absolute -bottom-1 left-0 right-0 h-0.5 bg-zinc-900 origin-left'
                                />
                            </span>
                        </h2>
                        <p className='text-zinc-400 text-sm mt-3 font-medium'>
                            Choose the ride that fits your journey
                        </p>
                    </div>

                    {/* Right: Scroll Left & Right Buttons */}
                    <div className='hidden sm:flex items-center gap-2'>
                        {/* Left Button */}
                        <motion.button
                            whileTap={{ scale: 0.88 }}
                            onClick={() => handleScroll('left')}
                            className='w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white transition-all text-zinc-700 shadow-sm cursor-pointer'
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        {/* Right Button */}
                        <motion.button
                            whileTap={{ scale: 0.88 }}
                            onClick={() => handleScroll('right')}
                            className='w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white transition-all text-zinc-700 shadow-sm cursor-pointer'
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Horizontal Scrollable Slider Cards Container */}
                <div
                    ref={sliderRef}
                    className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth py-2 px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {VEHICLE_CATEGORIES.map((category, index) => {
                        const isSelected = selectedCategory === category.title;
                        const IconComponent = category.Icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedCategory(category.title)}
                                className={`min-w-[240px] sm:min-w-[260px] p-6 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between select-none ${
                                    isSelected
                                        ? "bg-zinc-900 text-white border-zinc-900 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                        : "bg-zinc-50/80 text-zinc-900 border-zinc-200/80 hover:border-zinc-400 hover:bg-zinc-100/90 shadow-sm"
                                }`}
                            >
                                {/* Top: Icon & Tag Badge */}
                                <div className="flex items-start justify-between mb-8">
                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                                            isSelected
                                                ? "bg-white/15 text-white"
                                                : "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                                        }`}
                                    >
                                        <IconComponent size={24} />
                                    </div>

                                    <span
                                        className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                                            isSelected
                                                ? "bg-white/20 text-white"
                                                : "bg-zinc-200/80 text-zinc-700"
                                        }`}
                                    >
                                        {category.tag}
                                    </span>
                                </div>

                                {/* Bottom: Title & Description */}
                                <div>
                                    <h3 className="font-bold text-base tracking-tight flex items-center justify-between">
                                        {category.title}
                                        <ChevronRight
                                            size={16}
                                            className={`transition-transform duration-300 ${
                                                isSelected ? "translate-x-1 text-white" : "text-zinc-400"
                                            }`}
                                        />
                                    </h3>
                                    <p
                                        className={`text-xs mt-1 font-medium leading-relaxed ${
                                            isSelected ? "text-zinc-300" : "text-zinc-500"
                                        }`}
                                    >
                                        {category.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>


                {/* 7. Bottom Stats Section (Stats Array ko Map karke Render kiya) */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-8 sm:gap-12 mt-10 pt-8 border-t border-zinc-100"
                >
                    {[
                        { num: "6+", label: "Categories" },
                        { num: "50+", label: "Vehicle Types" },
                        { num: "24/7", label: "Availability" },
                    ].map((stat, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                                {stat.num}
                            </span>
                            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default VehicleSlider;
