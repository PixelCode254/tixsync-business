import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { buildCorsHeaders, handleOptions } from "@/lib/cors";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // ─── API Routes ─────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    // Handle CORS preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    // Auth check for mutation routes
    const isMutation = ["POST", "PUT", "DELETE", "PATCH"].includes(request.method);
    const publicGetRoutes = ["/api/services", "/api/projects", "/api/blog", "/api/team", "/api/auth"];
    const isPublicGet = request.method === "GET" && publicGetRoutes.some(r => pathname.startsWith(r));
    const isContactPost = pathname.startsWith("/api/contact") && request.method === "POST";
    const isContactReply = pathname.startsWith("/api/contact/reply") && request.method === "POST";
    const isAuthRoute = pathname.startsWith("/api/auth");

    // Server-to-server with valid API key bypasses session auth
    const apiKey = request.headers.get("x-api-key");
    const validApiKey = process.env.API_SECRET_KEY;
    const hasValidApiKey = apiKey && validApiKey && apiKey === validApiKey;

    if (isMutation && !isPublicGet && !isContactPost && !isContactReply && !isAuthRoute && !hasValidApiKey) {
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401, headers: buildCorsHeaders(origin) }
        );
      }
    }

    // Add CORS headers to all API responses
    const response = NextResponse.next();
    const corsHeaders = buildCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // ─── Admin Routes ───────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (pathname === "/admin/login") return NextResponse.next();
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
