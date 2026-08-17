import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";

export async function POST(req: NextRequest) {
    try {
        // Step 1: Request body parse karein
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { message: "Invalid request data. Please check your input." },
                { status: 400 }
            );
        }

        const name = typeof body?.name === "string" ? body.name.trim() : "";
        const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
        const password = typeof body?.password === "string" ? body.password : "";

        // Step 2: Form validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email and password are required" },
                { status: 400 }
            );
        }

        if (name.length < 2) {
            return NextResponse.json(
                { message: "Name must be at least 2 characters long" },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { message: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Step 3: MongoDB Database se connect karein
        try {
            await connectDb();
        } catch (dbErr: any) {
            console.error("❌ Database Connection Failed:", dbErr);
            return NextResponse.json(
                { message: "Database connection failed. Please check MongoDB connection." },
                { status: 500 }
            );
        }

        // Step 4: Check karein kya email pehle se exist karti hai
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email is already registered. Please login instead." },
                { status: 400 }
            );
        }

        // Step 5: 6-Digit Random OTP generate karein
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`\n========================================`);
        console.log(`🔥 REGISTRATION OTP FOR [${email}]: ${otp}`);
        console.log(`========================================\n`);

        // Step 6: OTP expiry set karein (10 minutes)
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        // Step 7: Password encrypt karein
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 8: User create karein
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isEmailVerified: false,
            otp: otp,
            otpExpires: otpExpires,
        });

        // Step 9: Nodemailer se email bhejein (agar fail ho toh bhi signup block nahi hoga)
        try {
            if (process.env.NODEMAILER_EMAIL && process.env.NODEMAILER_PASS && !process.env.NODEMAILER_PASS.includes("your_16")) {
                await sendMail({
                    to: email,
                    subject: "Your Rydex Verification Code",
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h2>Welcome to Rydex, ${name}!</h2>
                            <p>Your 6-digit email verification code is:</p>
                            <h1 style="background: #f4f4f4; padding: 10px 20px; display: inline-block; letter-spacing: 5px; color: #000;">${otp}</h1>
                            <p style="color: #888; font-size: 12px;">This code is valid for 10 minutes.</p>
                        </div>
                    `,
                });
            } else {
                console.log("ℹ️ Note: Nodemailer password not configured yet. Using Terminal OTP:", otp);
            }
        } catch (mailError) {
            console.error("⚠️ Nodemailer failed to send email (Check App Password):", mailError);
        }

        // Step 10: Success response return karein
        return NextResponse.json(
            {
                success: true,
                message: "Registration successful! Please verify OTP.",
                email: user.email,
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    isEmailVerified: user.isEmailVerified,
                },
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("REGISTER ERROR:", error);

        // Duplicate email error in MongoDB (code 11000)
        if (error?.code === 11000) {
            return NextResponse.json(
                { message: "Email is already registered. Please login." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Registration failed, please try again",
            },
            { status: 500 }
        );
    }
}
