import mongoose, { Model } from "mongoose";

// Interface defining the User document structure in TypeScript
export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    role?: string;
    isEmailVerified?: boolean;
    otp?: string;
    otpExpires?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    parthnerOnBoardingSteps: number
}

// Mongoose schema definition with validation rules
const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false, // Optional for Google OAuth users
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin", "partner"],
            default: "user",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
        },
        otpExpires: {
            type: Date,
        },
        parthnerOnBoardingSteps: {
            type: Number,
            min: 0,
            max: 8,
            default: 0


        },
    },
    { timestamps: true }
);

// Prevent mongoose model recompilation in Next.js hot-reloading environment
const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);

export default User;
