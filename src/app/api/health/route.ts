import { NextResponse } from "next/server";
import connectDb from "@/lib/db";

export async function GET() {
  try {
    await connectDb();
    return NextResponse.json(
      { status: "ok", database: "connected", timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Database connection failed",
      },
      { status: 500 }
    );
  }
}
