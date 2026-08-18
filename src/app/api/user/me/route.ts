import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        const session = await auth();

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "User is not authenticated" },
                { status: 401 }
            );
        }

        const user = await User.findOne({ email: session.user.email }).select("-password -otp -otpExpires");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("GET /api/user/me ERROR:", error);
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
}

