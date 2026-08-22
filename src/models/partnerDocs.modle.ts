import mongoose, { Document, Model, Schema } from "mongoose";

export type DocStatus = "approved" | "pending" | "rejected";

export interface IPartnerDocs extends Document {
    owner: mongoose.Types.ObjectId;
    aadharUrl: string;
    rcUrl: string;
    license: string;
    status: DocStatus;
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        aadharUrl: {
            type: String,
            required: true,
        },
        rcUrl: {
            type: String,
            required: true,
        },
        license: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["approved", "pending", "rejected"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// Prevent mongoose model recompilation in Next.js hot-reloading environment
const PartnerDocs: Model<IPartnerDocs> =
    (mongoose.models.PartnerDocs as Model<IPartnerDocs>) ||
    mongoose.model<IPartnerDocs>("PartnerDocs", partnerDocsSchema);

export default PartnerDocs;
