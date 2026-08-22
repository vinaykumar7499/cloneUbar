"use client";

import { motion } from "motion/react";
import { ArrowLeft, User, Phone, CreditCard, Building2, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BankDetailsPage() {
    const router = useRouter();

    // Input States
    const [accountHolder, setAccountHolder] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [upi, setUpi] = useState("");

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.08)] p-6 sm:p-8"
            >
                {/* 1. Header (Back button, Step 3 of 3, Title) */}
                <div className="relative text-center">
                    <button
                        type="button"
                        className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className="text-gray-500 font-medium text-xs tracking-wider uppercase">
                        Step 3 of 3
                    </p>
                    <h1 className="text-2xl font-bold mt-1 text-gray-900">
                        Bank Details
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Add your bank information for payment
                    </p>
                </div>

                {/* 2. Form Inputs with Lucide Icons */}
                <div className="mt-8 space-y-4">
                    {/* 1. Account Holder Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            Account Holder Name
                        </label>
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition">
                            <User size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Enter account holder name"
                                value={accountHolder}
                                onChange={(e) => setAccountHolder(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900"
                            />
                        </div>
                    </div>

                    {/* 2. Mobile Number */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            Mobile Number
                        </label>
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition">
                            <Phone size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="tel"
                                maxLength={10}
                                placeholder="Enter 10-digit mobile number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900 font-mono"
                            />
                        </div>
                    </div>

                    {/* 3. Account Number */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            Account Number
                        </label>
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition">
                            <CreditCard size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Enter account number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900 font-mono"
                            />
                        </div>
                    </div>

                    {/* 4. IFSC Code */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            IFSC Code
                        </label>
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition">
                            <Building2 size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                maxLength={11}
                                placeholder="Enter IFSC code"
                                value={ifsc}
                                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900 uppercase font-mono"
                            />
                        </div>
                    </div>

                    {/* 5. UPI ID (Optional) */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            UPI ID (Optional)
                        </label>
                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition">
                            <QrCode size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="e.g. name@upi"
                                value={upi}
                                onChange={(e) => setUpi(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400 text-gray-900"
                            />
                        </div>
                    </div>

                    {/* 3. Submit Button */}
                    <div className="pt-3">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition flex items-center justify-center cursor-pointer shadow-md"
                        >
                            Submit
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
