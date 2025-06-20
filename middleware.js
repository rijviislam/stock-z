import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = (req) => {
  const token = cookies().get(
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"
  );


  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/about"], // adjust as needed
};
