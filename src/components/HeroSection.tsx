'use client';

// 1. React, Next.js aur Icons import kiye
import React from 'react';
import { Bike, Bus, Car, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

type HeroProps = {
    openAuth?: () => void;
};

const HeroSection = ({ openAuth }: HeroProps) => {
    // 2. Next.js Router aur Redux user state
    const router = useRouter();
    const { userData } = useSelector((state: RootState) => state.user);

    // 3. "Book now" click handler: Agar login hai toh /booking par bhejo, warna Login popup kholo
    const handleBookNow = () => {
        if (userData) {
            router.push('/booking');
        } else {
            openAuth?.();
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/heroImage.jpg')" }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Main Centered Container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-white font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-tight"
                >
                    Book Any Vehicle
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-4 max-w-xl text-gray-300 text-base sm:text-lg font-medium"
                >
                    From daily rides to heavy transport — all in one platform.
                </motion.p>

                {/* Vehicle Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-8 flex items-center justify-center gap-8 text-gray-300"
                >
                    <Bike size={28} />
                    <Car size={28} />
                    <Bus size={28} />
                    <Truck size={28} />
                </motion.div>

                {/* Book Now Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookNow}
                    className="mt-12 px-10 py-4 bg-white text-black rounded-full font-semibold shadow-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    Book now
                </motion.button>
            </div>
        </div>
    );
};

export default HeroSection;