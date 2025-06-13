import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
const cookieStore = await cookies();
const token =
  cookieStore.get("next-auth.session-token") ||
  cookieStore.get("__Secure-next-auth.session-token");



  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  return NextResponse.next();
};
