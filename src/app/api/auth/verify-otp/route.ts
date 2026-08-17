import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Step 1: Request se email aur OTP extract karein
        const body = await req.json();
        const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
        const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

        // Step 2: Validation check
        if (!email || !otp) {
            return NextResponse.json(
                { message: "Email and OTP are required" },
                { status: 400 }
            );
        }

        // Step 3: DB Connect karein
        await connectDb();

        // Step 4: User find karein
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Step 5: Check karein kya OTP expire ho chuka hai
        if (user.otpExpires && new Date() > new Date(user.otpExpires)) {
            return NextResponse.json(
                { message: "OTP has expired. Please request a new one." },
                { status: 400 }
            );
        }

        // Step 6: Check karein kya OTP match hota hai
        if (user.otp !== otp) {
            return NextResponse.json(
                { message: "Invalid OTP code" },
                { status: 400 }
            );
        }

        // Step 7: Email ko verify mark karein aur OTP clear karein
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Step 8: Success response bhejein
        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully! You can now login.",
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("VERIFY OTP ERROR:", error);
        return NextResponse.json(
            {
                message: "OTP verification failed",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
