'use client';
import { X, Mail, Lock, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';

type PropType = {
    open: boolean;
    onClose: () => void;
};

type stepType = "login" | "signup" | "otp";

const AuthModal = ({ open, onClose }: PropType) => {
    const [Step, setStep] = useState<stepType>("login");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleSignup = async () => {
        try {
            const { data } = await axios.post("/api/auth/register", {
                name,
                email,
                password,
            });
            console.log("Signup success:", data);
            setStep("login");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
                    {/* 1. Backdrop (Black Film) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                    />

                    {/* 2. Center Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black"
                    >
                        {/* Close Button */}
                        <div
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-500 hover:text-black transition cursor-pointer"
                        >
                            <X size={28} />
                        </div>

                        {/* Title Header */}
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-extrabold tracking-widest">Ride</h1>
                            <p className="mt-1 text-xs text-gray-500">Premium Vehicle Booking</p>
                        </div>

                        {/* Google Button */}
                        <button className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition cursor-pointer">
                            <Image
                                src="/google.png"
                                alt="Google"
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain"
                            />
                            Continue with Google
                        </button>

                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-black/10" />
                            <div className="text-xs text-gray-500">OR</div>
                            <div className="flex-1 h-px bg-black/10" />
                        </div>

                        {/* Step 1: Login Form */}
                        <div>
                            {Step === "login" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h1 className="text-xl font-semibold">Welcome back</h1>
                                    <div className="mt-5 space-y-4">
                                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black transition">
                                            <Mail size={18} className="text-gray-500" />
                                            <input
                                                onChange={(e) => setemail(e.target.value)}
                                                value={email}
                                                type="email"
                                                placeholder="Email"
                                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black transition">
                                            <Lock size={18} className="text-gray-500" />
                                            <input
                                                onChange={(e) => setpassword(e.target.value)}
                                                value={password}
                                                type="password"
                                                placeholder="Password"
                                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                                            />
                                        </div>

                                        <button className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition cursor-pointer">
                                            Login
                                        </button>
                                    </div>

                                    <p className="mt-6 text-center text-sm text-gray-500">
                                        Don&apos;t have an Account?{" "}
                                        <span
                                            onClick={() => setStep("signup")}
                                            className="text-black font-medium hover:underline cursor-pointer"
                                        >
                                            Sign Up
                                        </span>
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Step 2: SignUp Form */}
                        <div>
                            {Step === "signup" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h1 className="text-xl font-semibold">Create Account</h1>
                                    <div className="mt-5 space-y-4">
                                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black transition">
                                            <User size={18} className="text-gray-500" />
                                            <input
                                                onChange={(e) => setname(e.target.value)}
                                                value={name}
                                                type="text"
                                                placeholder="UserName"
                                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black transition">
                                            <Mail size={18} className="text-gray-500" />
                                            <input
                                                onChange={(e) => setemail(e.target.value)}
                                                value={email}
                                                type="email"
                                                placeholder="Email"
                                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black transition">
                                            <Lock size={18} className="text-gray-500" />
                                            <input
                                                onChange={(e) => setpassword(e.target.value)}
                                                value={password}
                                                type="password"
                                                placeholder="Password"
                                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSignup}
                                            className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition cursor-pointer"
                                        >
                                            Sign up
                                        </button>
                                    </div>

                                    <p className="mt-6 text-center text-sm text-gray-500">
                                        Already have an account?{" "}
                                        <span
                                            onClick={() => setStep("login")}
                                            className="text-black font-medium hover:underline cursor-pointer"
                                        >
                                            Login
                                        </span>
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
