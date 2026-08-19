'use client';

// 1. React aur Next.js ke hooks import kiye
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

// 2. Redux aur NextAuth ke tools import kiye
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { signOut } from 'next-auth/react';
import { LogOut, Calendar, Menu, X, Handshake, LayoutDashboard } from 'lucide-react';

// 3. Navbar Navigation Items
const Nav_Items = ["Home", "Bookings", "About Us", "Contact"];

type NavProps = {
    openAuth?: () => void;
};

const Navbar = ({ openAuth }: NavProps) => {
    // Desktop Profile Dropdown State
    const [profileOpen, setProfileOpen] = useState(false);
    // Mobile Hamburger Menu State
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Redux se logged-in user ka data
    const { userData } = useSelector((state: RootState) => state.user);

    return (
        <>
            {/* Main Floating Navbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/10"
            >
                {/* 1. Left Side: Website Logo */}
                <div className="flex items-center">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Image
                            src="/logo.jpg"
                            alt="Logo"
                            width={120}
                            height={38}
                            priority
                            className="h-8 w-auto object-contain cursor-pointer"
                        />
                    </Link>
                </div>

                {/* 2. Center: Desktop Navigation Links (md:flex) */}
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

                {/* 3. Right Side: User Profile Avatar YA Login Button */}
                <div className="flex items-center gap-3 relative">
                    {userData ? (
                        <div className="relative">
                            {/* Outside click detector */}
                            {profileOpen && (
                                <div
                                    className="fixed inset-0 z-40 bg-transparent"
                                    onClick={() => setProfileOpen(false)}
                                />
                            )}

                            {/* Round Avatar Button (Single Letter 'A' or Image) */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="relative z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-sm uppercase shadow-md cursor-pointer border-2 border-white/20 overflow-hidden"
                            >
                                {userData.image ? (
                                    <Image
                                        src={userData.image}
                                        alt={userData.name || "User"}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span>{userData.name ? userData.name.charAt(0).toUpperCase() : "U"}</span>
                                )}
                            </motion.button>

                            {/* White Profile Dropdown Card (Exact Screenshot Match) */}
                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-13 w-64 rounded-2xl bg-white text-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4.5 flex flex-col z-50 border border-gray-100"
                                    >
                                        {/* User Name & Role */}
                                        <div className="mb-2">
                                            <h4 className="text-sm font-extrabold text-zinc-900 leading-tight">
                                                {userData.name || "User"}
                                            </h4>
                                            <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase mt-0.5">
                                                {userData.role || "USER"}
                                            </p>
                                        </div>

                                        {/* Become a Partner Gray Banner Card (Screenshot Match) */}
                                        {userData.role !== "partner" && userData.role !== "admin" && (
                                            <Link
                                                href="/partner/register"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 hover:bg-zinc-200/90 transition-colors my-2 group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {/* Vehicle Icons Group */}
                                                    <div className="flex items-center gap-1 text-zinc-800 bg-white px-1.5 py-1 rounded-md shadow-2xs">
                                                        <Bike size={12} />
                                                        <Car size={12} />
                                                        <Truck size={12} />
                                                    </div>
                                                    <span className="text-xs font-semibold text-zinc-900">
                                                        Become a Partner
                                                    </span>
                                                </div>
                                                <ChevronRight size={14} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        )}

                                        {/* Partner Dashboard (Agar user Partner hai) */}
                                        {userData.role === "partner" && (
                                            <Link
                                                href="/partner"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 hover:bg-zinc-200/90 transition-colors my-2 group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-white p-1.5 rounded-md shadow-2xs text-emerald-600">
                                                        <LayoutDashboard size={14} />
                                                    </div>
                                                    <span className="text-xs font-semibold text-zinc-900">
                                                        Partner Dashboard
                                                    </span>
                                                </div>
                                                <ChevronRight size={14} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        )}

                                        {/* Admin Dashboard (Agar user Admin hai) */}
                                        {userData.role === "admin" && (
                                            <Link
                                                href="/admin"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 hover:bg-zinc-200/90 transition-colors my-2 group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-white p-1.5 rounded-md shadow-2xs text-blue-600">
                                                        <LayoutDashboard size={14} />
                                                    </div>
                                                    <span className="text-xs font-semibold text-zinc-900">
                                                        Admin Dashboard
                                                    </span>
                                                </div>
                                                <ChevronRight size={14} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        )}

                                        {/* Logout Button */}
                                        <button
                                            onClick={() => {
                                                setProfileOpen(false);
                                                signOut({ callbackUrl: "/" });
                                            }}
                                            className="flex items-center gap-2 w-full text-left px-1 pt-2 pb-1 text-xs font-semibold text-zinc-700 hover:text-black transition-colors cursor-pointer mt-1"
                                        >
                                            <LogOut size={15} />
                                            <span>Logout</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        // Desktop Login Button
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openAuth}
                            className="hidden sm:block px-5 py-1.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                        >
                            Login
                        </motion.button>
                    )}

                    {/* 4. Mobile Hamburger Menu Toggle Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
                        aria-label="Toggle Mobile Menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </motion.div>

            {/* 5. Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Background Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Mobile Menu Dropdown Card */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="fixed top-18 left-1/2 -translate-x-1/2 w-[94%] z-50 rounded-3xl bg-[#111111]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-5 text-white flex flex-col gap-4 md:hidden"
                        >
                            {/* Navigation Links */}
                            <div className="flex flex-col gap-2">
                                {Nav_Items.map((item, index) => {
                                    const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                        <Link
                                            key={index}
                                            href={href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-3 rounded-2xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    );
                                })}

                                {/* Mobile Role Links */}
                                {userData && userData.role !== "partner" && userData.role !== "admin" && (
                                    <Link
                                        href="/partner/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-3 rounded-2xl text-base font-medium text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-2"
                                    >
                                        <Handshake size={18} />
                                        Become a Partner
                                    </Link>
                                )}

                                {userData && userData.role === "partner" && (
                                    <Link
                                        href="/partner"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-3 rounded-2xl text-base font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
                                    >
                                        <LayoutDashboard size={18} />
                                        Partner Dashboard
                                    </Link>
                                )}

                                {userData && userData.role === "admin" && (
                                    <Link
                                        href="/admin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-3 rounded-2xl text-base font-medium text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center gap-2"
                                    >
                                        <LayoutDashboard size={18} />
                                        Admin Dashboard
                                    </Link>
                                )}
                            </div>

                            {/* Mobile User Actions */}
                            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                                {!userData ? (
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            openAuth?.();
                                        }}
                                        className="w-full py-3 rounded-2xl bg-white text-black font-semibold text-center hover:bg-gray-200 transition cursor-pointer"
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            signOut({ callbackUrl: "/" });
                                        }}
                                        className="w-full py-3 rounded-2xl bg-red-500/10 text-red-400 font-semibold flex items-center justify-center gap-2 hover:bg-red-500/20 transition cursor-pointer"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;