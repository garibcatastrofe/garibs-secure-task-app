import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "@/src/Users/Infrastructure/UserControlador";

export async function proxy(request: NextRequest) {
  const responseVerify = await verify();

  if (!responseVerify.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/tasks/:path*", "/users/:path*"],
};
