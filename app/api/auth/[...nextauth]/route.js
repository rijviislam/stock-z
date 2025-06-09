// import connectDb from "@/lib/connectDb";
import connectDb from "@/lib/connectDb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!credentials) {
          return null;
        }
        if (!email || !password) {
          return null;
        }
        if (email) {
          const db = await connectDb();
          const currentUser = await db.collection("users").findOne({ email });

          if (!currentUser) {
            return null;
          }
          const passMatch = bcrypt.compareSync(password, currentUser.password);
          if (!passMatch) {
            return null;
          }
          return currentUser;
        }
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
