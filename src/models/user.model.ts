import mongoose, { Document, Model } from "mongoose";

// Interface defining the User document structure in TypeScript
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
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
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

// Prevent mongoose model recompilation in Next.js hot-reloading environment
const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);

export default User;
