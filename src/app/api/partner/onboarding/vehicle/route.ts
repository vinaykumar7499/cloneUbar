import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";

// 1. Vehicle Number Plate Format Regex (e.g. DL 01 AB 1234, MH12AB1234, UP 32 CD 4567)
const VEHICLE_REGEX = /^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z]{1,3})?[ -]?[0-9]{4}$/i;

// 2. POST API to create or update vehicle details and update partner onboarding step
export async function POST(req: Request) {
    try {
        // Step 1: Database se connect karein
        await connectDb();

        // Step 2: User session check karein (Login verification)
        const session = await auth();
        if (!session || !session.user?.id) {
            return Response.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Step 3: Request body se data extract karein
        const { type, number, vehicleModel } = await req.json();

        // Step 4: Check karein ki sabhi required fields aayi hain ya nahi
        if (!type || !number || !vehicleModel) {
            return Response.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Step 5: Vehicle number format validate karein (Number plate format check)
        if (!VEHICLE_REGEX.test(number.trim())) {
            return Response.json(
                { message: "Invalid Vehicle Number Format" },
                { status: 400 }
            );
        }

        // Step 6: Vehicle number ko uppercase aur trim karein
        const vehicleNumber = number.trim().toUpperCase();

        // Step 7: Check karein ki kya is user ka vehicle pehle se database me exist karta hai
        let vehicle = await Vehicle.findOne({ owner: session.user.id });

        if (vehicle) {
            // Agar vehicle pehle se exist karta hai toh update karein
            vehicle.type = type;
            vehicle.number = vehicleNumber;
            vehicle.vehicleModel = vehicleModel;
            vehicle.status = "pending";
            await vehicle.save();
        } else {
            // Agar vehicle nahi hai toh naya vehicle create karein
            vehicle = await Vehicle.create({
                owner: session.user.id,
                type,
                number: vehicleNumber,
                vehicleModel,
                status: "pending",
            });
        }

        // Step 8: User model me partner onboarding step update karein (Step 1 complete)
        const user = await User.findById(session.user.id);
        if (user) {
            user.parthnerOnBoardingSteps = 1;
            await user.save();
        }

        // Step 9: Success response return karein
        return Response.json(
            {
                message: "Vehicle details saved successfully",
                vehicle,
                user,
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Vehicle API Error:", error);
        return Response.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
