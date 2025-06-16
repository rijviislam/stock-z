

import { NextResponse } from "next/server";
export const middleware = (request) => {
  const token =cookieStore.get("next-auth.session-token") ||
    cookieStore.get("__Secure-next-auth.session-token");
  console.log(token)
  if(!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.next();
    
};
export const config = {
  matcher: ["/about"],
};
