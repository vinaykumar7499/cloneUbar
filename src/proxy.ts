

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const PUBLIC_ROUTES = ["/"];
const PUBLIC_API = ["/api/auth"];

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1. Static files & Next.js internal files ko bypass karo
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // 2. Public Routes & Public Auth API
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isPublicApi = PUBLIC_API.some((route) => pathname.startsWith(route));

    if (isPublicRoute || isPublicApi) {
        return NextResponse.next();
    }

    // 3. User Session check karein
    const session = await auth();

    // Agar user login nahi hai
    if (!session || !session.user) {
        // API call hai toh 401 Unauthorized JSON bhejo
        if (pathname.startsWith("/api")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Page hai toh Home ("/") par redirect karo
        return NextResponse.redirect(new URL("/", req.url));
    }

    const role = session.user.role;

    // 4. Admin Page Security (/admin)
    if (pathname.startsWith("/admin")) {
        if (role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // 5. Partner Page Security (/partner)
    if (pathname.startsWith("/partner")) {
        if (role !== "partner") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // 6. Protected API Security (/api)
    if (pathname.startsWith("/api")) {
        if (!session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

// Matcher Config
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

export default proxy;
export { proxy as Proxy };


