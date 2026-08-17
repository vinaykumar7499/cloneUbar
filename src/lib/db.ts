import mongoose from "mongoose";
import dns from "dns";

// Configure DNS at module load to resolve MongoDB Atlas SRV records
try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"]);
} catch {
    // Ignored if runtime restricts custom DNS
}

let cached = global.mongooseConn;

if (!cached) {
    cached = global.mongooseConn = {
        conn: null,
        promise: null,
    };
}

const connectDb = async (): Promise<typeof mongoose> => {
    try {
        dns.setDefaultResultOrder("ipv4first");
        dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"]);
    } catch {
        // Ignored
    }

    const mongodbUrl = process.env.MONGO_URL;

    if (!mongodbUrl) {
        throw new Error("MONGO_URL is missing in environment variables (.env.local)");
    }

    if (cached?.conn && mongoose.connection.readyState >= 1) {
        return cached.conn;
    }

    if (!cached?.promise) {
        const opts = {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        };

        cached!.promise = mongoose.connect(mongodbUrl, opts).then((mongooseInstance) => {
            console.log("MongoDB connected successfully");
            return mongooseInstance;
        });
    }

    try {
        cached!.conn = await cached!.promise;
        return cached!.conn;
    } catch (error) {
        if (cached) {
            cached.promise = null;
        }
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDb;