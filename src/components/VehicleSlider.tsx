
'use client';

// 1. React aur UI libraries import kiye
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bike, Bus, Car, CarTaxiFront, Truck, ChevronRight } from 'lucide-react';
import { div } from 'motion/react-client';

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
    // 3. Current selected category store karne ke liye state

    return (
        <div className='w-full bg-white py-20 px-4 overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className='flex item-end justify-between mb-10'
                >
                    <div>
                        <div className='flex items-center gap-2 mb-3'>

                            <div className='h-px w-8 bg-zinc-900' />
                            <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>Fleet</span>
                        </div  >

                        <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 leading-none'>Vehicles
                            <br />
                            <span className='relative inline-block'>Categories



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

                </motion.div>

            </div>

        </div>
    )


};

export default VehicleSlider;
