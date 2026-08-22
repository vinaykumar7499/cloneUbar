"use client";

import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, UploadCloud, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Document items list (Aadhaar, Driving License, RC)
const DOC_TYPES = [
    {
        id: "aadhar",
        title: "Aadhaar Card",
        desc: "Upload photo of your Aadhaar Card (Front)",
        accepted: "image/*,application/pdf",
    },
    {
        id: "license",
        title: "Driving License (DL)",
        desc: "Upload valid Driving License",
        accepted: "image/*,application/pdf",
    },
    {
        id: "rc",
        title: "Registration Certificate (RC)",
        desc: "Upload Vehicle RC Document",
        accepted: "image/*,application/pdf",
    },
];

export default function DocumentsPage() {
    const router = useRouter();

    // 1. Files state: Har document ki selected file store karne ke liye
    const [docs, setDocs] = useState<{ [key: string]: File | null }>({
        aadhar: null,
        license: null,
        rc: null,
    });

    // 2. Loading aur Error states
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // 3. File select hone par state update karne ka function
    const handleFileChange = (docId: string, file: File | null) => {
        if (!file) return;
        setError(""); // Purana error clear karein
        setDocs((prev) => ({
            ...prev,
            [docId]: file,
        }));
    };

    // 4. Form Submit / Next step par jaane ka function
    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation: Check karein kya teeno documents upload ho gaye hain
        if (!docs.aadhar || !docs.license || !docs.rc) {
            setError("Please upload all 3 required documents (Aadhaar, DL, and RC) to continue.");
            return;
        }

        setLoading(true);
        try {
            // Document names ko session me temporarily save karein
            sessionStorage.setItem(
                "partner_docs_data",
                JSON.stringify({
                    aadharName: docs.aadhar.name,
                    licenseName: docs.license.name,
                    rcName: docs.rc.name,
                })
            );

            // Step 3 (Bank Details) par navigate karein
            router.push("/partner/onboarding/bank");
        } catch (err) {
            console.error("Error saving documents:", err);
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
                {/* 1. Header (Back button + Title) */}
                <div className="relative text-center">
                    <button
                        type="button"
                        className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className="text-gray-500 font-medium text-xs tracking-wider uppercase">
                        Step 2 of 3
                    </p>
                    <h1 className="text-2xl font-bold mt-1 text-gray-900">
                        Vehicle Documents
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Upload your verification documents to get started
                    </p>
                </div>

                {/* 2. Documents Upload Form */}
                <form onSubmit={handleNext} className="mt-8 space-y-5">
                    {/* Error Message Box */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"
                        >
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Document Upload Cards (Aadhaar, License, RC) */}
                    <div className="space-y-3.5">
                        {DOC_TYPES.map((doc) => {
                            const isUploaded = !!docs[doc.id];
                            const currentFile = docs[doc.id];

                            return (
                                <motion.label
                                    key={doc.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={`relative flex items-center justify-between p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                                        isUploaded
                                            ? "border-green-500 bg-green-50/50"
                                            : "border-gray-300 bg-gray-50/70 hover:bg-gray-100/60 hover:border-gray-400"
                                    }`}
                                >
                                    {/* Left Icon + Text */}
                                    <div className="flex items-center gap-3.5 min-w-0 pr-3">
                                        <div
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                                isUploaded
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                        >
                                            {isUploaded ? (
                                                <CheckCircle2 size={22} />
                                            ) : (
                                                <FileText size={22} />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm text-gray-900 truncate">
                                                {doc.title}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">
                                                {isUploaded && currentFile
                                                    ? currentFile.name
                                                    : doc.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Action / Status Badge */}
                                    <div className="shrink-0">
                                        {isUploaded ? (
                                            <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                                Selected
                                            </span>
                                        ) : (
                                            <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 px-3 py-1.5 rounded-xl shadow-xs">
                                                <UploadCloud size={14} />
                                                <span>Upload</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        accept={doc.accepted}
                                        className="hidden"
                                        onChange={(e) =>
                                            handleFileChange(
                                                doc.id,
                                                e.target.files ? e.target.files[0] : null
                                            )
                                        }
                                    />
                                </motion.label>
                            );
                        })}
                    </div>

                    {/* 3. Continue Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-md mt-6"
                    >
                        <span>Continue to Step 3</span>
                        <ArrowRight size={18} />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}