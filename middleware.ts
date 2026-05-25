import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new NextResponse("Admin password not configured", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="JKK Admin"' },
    });
  }

  const decoded = atob(auth.slice(6));
  const sep = decoded.indexOf(":");
  const pass = sep >= 0 ? decoded.slice(sep + 1) : "";
  if (pass !== adminPassword) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="JKK Admin"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
