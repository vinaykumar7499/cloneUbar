'use client';

import { X, Mail, Lock, User, CircleDashed } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

type PropType = {
    open: boolean;
    onClose: () => void;
};

// 3 Steps: Login -> SignUp -> OTP Verification
type stepType = "login" | "signup" | "otp";

const AuthModal = ({ open, onClose }: PropType) => {
    // NextAuth session hook (JWT & Session Token read karne ke liye)
    const { data: session, status } = useSession();

    const [Step, setStep] = useState<stepType>("login");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [otp, setotp] = useState(["", "", "", "", "", ""]); // 6-digit OTP array
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [successMessage, setsuccessMessage] = useState("");

    // Step 1: User Signup Handler (API se 6-digit OTP generate karega)
    const handleSignup = async () => {
        setloading(true);
        seterror("");
        try {
            const { data } = await axios.post("/api/auth/register", {
                name,
                email,
                password,
            });
            console.log("Signup success, OTP sent:", data);
            
            // Signup ke turant baad OTP verification screen par bhejna
            setStep("otp");
            setsuccessMessage("OTP sent to your email! Please verify.");
        } catch (error: any) {
            console.error("Signup error:", error?.response?.data?.message || error.message);
            seterror(error?.response?.data?.message || "Signup failed");
        } finally {
            setloading(false);
        }
    };

    // Step 2: OTP Verification Handler
    const handleVerifyOtp = async () => {
        const fullOtp = otp.join("");
        if (fullOtp.length !== 6) {
            seterror("Please enter complete 6-digit OTP");
            return;
        }

        setloading(true);
        seterror("");
        try {
            const { data } = await axios.post("/api/auth/verify-otp", {
                email,
                otp: fullOtp,
            });
            console.log("OTP Verified:", data);
            setsuccessMessage("Email verified successfully! Please login.");
            
            // OTP verify hone ke baad Login screen par bhejna
            setStep("login");
        } catch (err: any) {
            console.error("Verify OTP error:", err);
            seterror(err?.response?.data?.message || "Invalid OTP code");
        } finally {
            setloading(false);
        }
    };

    // Step 3: Credentials Login Handler
    const handelLogin = async () => {
        setloading(true);
        seterror("");
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                seterror("Invalid email or password");
            } else {
                onClose(); // Login hone par modal close karein
            }
            console.log(res);
        } catch (err: any) {
            console.error("Login error:", err);
            seterror("Login failed");
        } finally {
            setloading(false);
        }
    };

    // Step 4: Google OAuth Login Handler
    const handleGoogleLogin = async () => {
        seterror("");
        try {
            await signIn("google", { callbackUrl: "/" });
        } catch (err) {
            console.error("Google login error:", err);
            seterror("Google login failed");
        }
    };

    // OTP Input Change Handler (Har box me 1 digit input ke liye)
    const handlechangeotp = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1); // Sirf last character rakhna
        }
        const newOtp = [...otp];
        newOtp[index] = value;
        setotp(newOtp);

        // Auto-focus next input box
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            nextInput?.focus();
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

                        {/* Google Button (Sirf Login/Signup me dikhega) */}
                        {Step !== "otp" && (
                            <>
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                                >
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
                            </>
                        )}

                        {/* Error Alert Box */}
                        {error && (
                            <p className="text-red-500 text-xs text-center mb-4">{error}</p>
                        )}

                        {/* Success Alert Box */}
                        {successMessage && (
                            <p className="text-green-600 text-xs text-center mb-4">{successMessage}</p>
                        )}

                        {/* Step 1: Login Form */}
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

                                    <button
                                        type="button"
                                        onClick={handelLogin}
                                        disabled={loading}
                                        className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition cursor-pointer flex justify-center items-center"
                                    >
                                        {loading ? <CircleDashed size={18} color="white" className="animate-spin" /> : "Login"}
                                    </button>
                                </div>

                                <p className="mt-6 text-center text-sm text-gray-500">
                                    Don&apos;t have an Account?{" "}
                                    <span
                                        onClick={() => {
                                            setStep("signup");
                                            seterror("");
                                            setsuccessMessage("");
                                        }}
                                        className="text-black font-medium hover:underline cursor-pointer"
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </motion.div>
                        )}

                        {/* Step 2: SignUp Form */}
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
                                        type="button"
                                        onClick={handleSignup}
                                        disabled={loading}
                                        className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center cursor-pointer"
                                    >
                                        {loading ? <CircleDashed size={18} color="white" className="animate-spin" /> : "Sign up"}
                                    </button>
                                </div>

                                <p className="mt-6 text-center text-sm text-gray-500">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => {
                                            setStep("login");
                                            seterror("");
                                            setsuccessMessage("");
                                        }}
                                        className="text-black font-medium hover:underline cursor-pointer"
                                    >
                                        Login
                                    </span>
                                </p>
                            </motion.div>
                        )}

                        {/* Step 3: OTP Verification Form */}
                        {Step === "otp" && (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-xl font-semibold">Verify Email</h2>
                                <p className="text-xs text-gray-500 mt-1">
                                    We sent a 6-digit code to <strong className="text-black">{email}</strong>
                                </p>

                                <div className="mt-5 space-y-4">
                                    {/* 6 Individual OTP Input Boxes */}
                                    <div className="flex justify-between gap-2">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-input-${index}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handlechangeotp(index, e.target.value)}
                                                className="w-11 h-12 text-center text-lg font-bold border border-black/20 rounded-xl focus:border-black outline-none transition"
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={loading}
                                        className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center cursor-pointer"
                                    >
                                        {loading ? <CircleDashed size={18} color="white" className="animate-spin" /> : "Verify OTP"}
                                    </button>

                                    <p className="mt-4 text-center text-xs text-gray-500">
                                        Wrong email?{" "}
                                        <span
                                            onClick={() => setStep("signup")}
                                            className="text-black font-medium hover:underline cursor-pointer"
                                        >
                                            Change email
                                        </span>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
