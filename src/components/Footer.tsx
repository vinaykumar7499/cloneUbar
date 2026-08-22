'use client';

// 1. React aur UI libraries import kiye
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#080808] text-white border-t border-white/10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-6 py-16"
            >
                {/* 2. Main 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.jpg"
                                alt="Rydex Logo"
                                width={130}
                                height={40}
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mt-2">
                            Book any vehicle — from bikes to heavy transport trucks. Trusted owners, transparent pricing, and seamless booking.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Quick Links
                        </h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                            {["Home", "Booking", "About Us", "Contact"].map((item, index) => {
                                const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                                return (
                                    <Link
                                        key={index}
                                        href={href}
                                        className="hover:text-white transition-colors duration-200 w-fit flex items-center gap-1"
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 3: Fleet Categories */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Our Fleet
                        </h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                            {["Bikes & Scooters", "City Cars", "Premium SUVs", "Passenger Vans", "Commercial Trucks"].map((type, index) => (
                                <span key={index} className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Contact & Support */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Contact Us
                        </h3>
                        <div className="flex flex-col gap-3 text-sm text-gray-400">
                            <div className="flex items-center gap-2.5">
                                <Mail size={16} className="text-gray-400 shrink-0" />
                                <span>vinayrajput@rydex.com</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone size={16} className="text-gray-400 shrink-0" />
                                <span>+91 8077507499</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <MapPin size={16} className="text-gray-400 shrink-0" />
<<<<<<< HEAD
                                <span>BulandShahr's India</span>
=======
                                <span>New Delhi, India</span>
>>>>>>> 3cdb06bd164e795e9756e14ccdffe159a3994b86
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Copyright Bar */}
                <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Rydex Logistics. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;