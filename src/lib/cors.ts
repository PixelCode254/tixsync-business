import { NextRequest, NextResponse } from "next/server";

// ─── Allowed Origins ────────────────────────────────────────────
// In production, set CORS_ORIGINS as a comma-separated list:
//   https://corneliusmaina.dev,https://tixsyncsolutions.com
// In development, we allow localhost origins automatically.

function getAllowedOrigins(): string[] {
  const envOrigins = process.env.CORS_ORIGINS;
  if (envOrigins) {
    return envOrigins.split(",").map(o => o.trim()).filter(Boolean);
  }
  // Development defaults
  return [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ];
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  return allowed.includes(origin);
}

// ─── CORS Headers Builder ───────────────────────────────────────

export function buildCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key, X-Request-Id",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Expose-Headers": "X-Request-Id",
  };

  if (origin && isOriginAllowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  } else if (!process.env.CORS_ORIGINS) {
    // Development: reflect any origin
    headers["Access-Control-Allow-Origin"] = origin || "*";
    headers["Vary"] = "Origin";
  }

  return headers;
}

// ─── Handle CORS Preflight (OPTIONS) ───────────────────────────

export function handleOptions(request: NextRequest): NextResponse {
  const origin = request.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// ─── Wrap API response with CORS headers ───────────────────────

export function withCors(response: NextResponse, request: NextRequest): NextResponse {
  const origin = request.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  const newResponse = NextResponse.json(
    response.body,
    { status: response.status, statusText: response.statusText, headers: response.headers }
  );

  // Copy existing headers then merge CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });

  return newResponse;
}

// ─── API Key Validation ────────────────────────────────────────
// For cross-origin server-to-server calls, we use an API key.
// Browser calls use Origin header; server calls use X-API-Key.

export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.API_SECRET_KEY;

  // If no API key is configured, skip validation (dev mode)
  if (!validKey) return true;

  return apiKey === validKey;
}

export function isServerToServer(request: NextRequest): boolean {
  // Server-to-server requests have no Origin header but have an API key
  return !request.headers.get("origin") && !!request.headers.get("x-api-key");
}

// ─── Combined CORS + Auth check for public API routes ──────────

export function corsResponse(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  // Handle preflight
  if (request.method === "OPTIONS") {
    return Promise.resolve(handleOptions(request));
  }

  // For server-to-server, validate API key
  if (isServerToServer(request) && !validateApiKey(request)) {
    return Promise.resolve(
      NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    );
  }

  // For browser requests, validate origin
  const origin = request.headers.get("origin");
  if (origin && !isOriginAllowed(origin) && process.env.CORS_ORIGINS) {
    return Promise.resolve(
      NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
    );
  }

  return handler().then(response => withCors(response, request));
}
