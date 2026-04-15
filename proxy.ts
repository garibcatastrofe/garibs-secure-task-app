import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PORT } from "@/src/Shared/Domain/Consts/Port";

export async function proxy(request: NextRequest) {
  try {
    const res = await fetch(PORT + "/verify", {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/home/:path*", "/tasks/:path*", "/users/:path*"],
};
