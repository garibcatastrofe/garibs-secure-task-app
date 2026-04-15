import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken");

    if (!token) {
      console.log("No hay token de sesión")
      /* return NextResponse.redirect(new URL("/", request.url)); */
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/home/:path*", "/tasks/:path*", "/users/:path*"],
};
