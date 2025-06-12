import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const cookieStore = cookies();
  const token =
    cookieStore.get("next-auth.session-token") ||
    cookieStore.get("__Secure-next-auth.session-token");


  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
};
