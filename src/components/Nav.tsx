'use client'
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

const Nav_Items = ["Home", "Booking", "About Us", "Contact"];

const Navbar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] px-6 py-2.5 flex items-center justify-between border border-white/10"
        >
            {/* 1. Left: Logo */}
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={120}
                        height={38}
                        priority
                        className="h-8 w-auto object-contain cursor-pointer"
                    />
                </Link>
            </div>

            {/* 2. Center: Navigation Links (Mathematically Centered) */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {Nav_Items.map((item, index) => {
                    const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                        <Link
                            key={index}
                            href={href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            {item}
                        </Link>
                    );
                })}
            </div>

            {/* 3. Right: Login Button */}
            <div className="flex items-center">
                <button className="px-5 py-1.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors duration-200">
                    Login
                </button>
            </div>
        </motion.div>
    );
};

export default Navbar;