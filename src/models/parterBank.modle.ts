import mongoose, { Document, Model, Schema } from "mongoose";

export type BankStatus = "not_added" | "added" | "verified";

export interface IPartnerBank extends Document {
    owner: mongoose.Types.ObjectId;
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    upi?: string;
    status: BankStatus;
    createdAt: Date;
    updatedAt: Date;
}

const partnerBankSchema = new mongoose.Schema<IPartnerBank>(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        accountHolder: {
            type: String,
            required: true,
            trim: true,
        },
        accountNumber: {
            type: String,
            required: true,
            trim: true,
            unique:true
        },
        ifsc: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },
        upi: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["not_added", "added", "verified"],
            default: "not_added",
        },
    },
    { timestamps: true }
);

// Prevent mongoose model recompilation in Next.js hot-reloading environment
const PartnerBank: Model<IPartnerBank> =
    (mongoose.models.PartnerBank as Model<IPartnerBank>) ||
    mongoose.model<IPartnerBank>("PartnerBank", partnerBankSchema);

export default PartnerBank;