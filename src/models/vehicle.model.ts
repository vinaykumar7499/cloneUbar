import mongoose, { Document, Model, Schema } from "mongoose";

export type VehicleType = "bike" | "car" | "loading" | "truck" | "auto";
export type VehicleStatus = "approved" | "pending" | "rejected";

export interface IVehicle extends Document {
    owner: mongoose.Types.ObjectId;
    type: VehicleType;
    vehicleModel: string;
    number: string;
    imageUrl?: string;
    baseFare?: number;
    pricePerKM: number;
    waitingCharge: number;
    status: VehicleStatus;
    rejectionReason?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const vehicleSchema = new mongoose.Schema<IVehicle>(
    {
        owner: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["bike", "car", "loading", "truck", "auto"],
            required: true,
        },
        vehicleModel: {
            type: String,
            required: true,
            trim: true,
        },
        number: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        imageUrl: {
            type: String,
        },
        baseFare: {
            type: Number,
            // default: 0,
        },
        pricePerKM: {
            type: Number,
            // required: true,
        },
        waitingCharge: {
            type: Number,
            // default: 0,
        },
        status: {
            type: String,
            enum: ["approved", "pending", "rejected"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
            // default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Prevent mongoose model recompilation in Next.js hot-reloading environment
const Vehicle: Model<IVehicle> =
    (mongoose.models.Vehicle as Model<IVehicle>) ||
    mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;
