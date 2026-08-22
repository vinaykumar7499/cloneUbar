import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SCRET,
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
    if (!file) {
        return null;
    }
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result?.secure_url || null);
                    }
                }
            );

            // Stream me buffer write karke upload end karein
            uploadStream.end(buffer);
        });
    } catch (error) {
        console.error("uploadOnCloudinary catch error:", error);
        return null;
    }
};

export default uploadOnCloudinary;
