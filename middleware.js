import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export  const middleware = (req) => {
    const token = cookies(req).get("__Secure-next-auth.session-token")
    console.log(token)
    if(!token) {
        return NextResponse.redirect(new URL("api/auth/signin", req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher : ["/about"]
}