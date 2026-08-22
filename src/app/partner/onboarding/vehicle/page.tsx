"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bike, Car, Package, Truck, Check, Hash, Tag, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const VEHICLES = [
    { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
    { id: "auto", label: "Auto", icon: Car, desc: "3 wheeler ride" },
    { id: "car", label: "Car", icon: Car, desc: "4 wheeler ride" },
    { id: "loading", label: "Loading", icon: Package, desc: "Small goods" },
    { id: "truck", label: "Truck", icon: Truck, desc: "Heavy transport" },
];

export default function VehicleOnboardingPage() {
    const router = useRouter();

    const [vehicleType, setVehicleType] = useState<string>("bike");
    const [vehicleModel, setVehicleModel] = useState<string>("");
    const [vehicleNumber, setVehicleNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!vehicleType) {
            setError("Please select a vehicle type");
            return;
        }

        if (!vehicleModel.trim()) {
            setError("Please enter vehicle model (e.g. Hero Splendor, Swift Dzire)");
            return;
        }

        if (!vehicleNumber.trim()) {
            setError("Please enter vehicle registration number (e.g. DL 01 AB 1234)");
            return;
        }

        setLoading(true);
        try {
            // Save state or proceed to Step 2 (Documents)
            sessionStorage.setItem(
                "partner_vehicle_data",
                JSON.stringify({
                    type: vehicleType,
                    vehicleModel: vehicleModel.trim(),
                    number: vehicleNumber.trim().toUpperCase(),
                })
            );

            // Navigate to step 2
            router.push("/partner/onboarding/documents");
        } catch (err: any) {
            console.error("Error saving vehicle data:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.08)] p-6 sm:p-8"
            >
                {/* Top Header */}
                <div className="relative text-center">
                    <button
                        type="button"
                        className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className="text-gray-500 font-medium text-xs tracking-wider uppercase">
                        Step 1 of 3
                    </p>
                    <h1 className="text-2xl font-bold mt-1 text-gray-900">
                        Vehicle Details
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Add your vehicle information to get started
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleNext} className="mt-8 space-y-6">
                    {/* Error Alert */}
                    {error && (
                        <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    {/* Vehicle Type Selection Grid */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">
                            Select Vehicle Type
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {VEHICLES.map((v) => {
                                const Icon = v.icon;
                                const isSelected = vehicleType === v.id;

                                return (
                                    <motion.button
                                        type="button"
                                        key={v.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setVehicleType(v.id)}
                                        className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                            isSelected
                                                ? "border-black bg-black text-white shadow-lg"
                                                : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
                                        }`}
                                    >
                                        {/* Checked Badge */}
                                        {isSelected && (
                                            <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                        )}

                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                                                isSelected
                                                    ? "bg-white/10 text-white"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            <Icon size={24} />
                                        </div>

                                        <span className="font-semibold text-sm">{v.label}</span>
                                        <span
                                            className={`text-xs mt-0.5 ${
                                                isSelected ? "text-gray-300" : "text-gray-400"
                                            }`}
                                        >
                                            {v.desc}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        {/* Vehicle Model */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                                Vehicle Model / Name
                            </label>
                            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black transition bg-white">
                                <Tag size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Hero Splendor, Swift Dzire, Tata Ace"
                                    value={vehicleModel}
                                    onChange={(e) => setVehicleModel(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Registration Number */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                                Vehicle Registration Number
                            </label>
                            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-black transition bg-white">
                                <Hash size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. DL 01 AB 1234"
                                    value={vehicleNumber}
                                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                                    className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900 uppercase font-mono tracking-wider"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-md"
                    >
                        <span>Continue to Step 2</span>
                        <ArrowRight size={18} />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}