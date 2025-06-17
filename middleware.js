// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export const middleware = async (req) => {
//   const token =
//     cookies(req).get("next-auth.session-token") ||
//     cookies(req).get("__Secure-next-auth.session-token");
//   console.log("Token in middleware:", token);
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/about"],
// };


import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = (req) => {
  const token = cookies().get(
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"
  );

  console.log("Token in middleware:", token?.value);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/about"], // adjust as needed
};
