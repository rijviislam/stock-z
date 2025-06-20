import connectDb from "@/lib/connectDb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    secret: process.env.AUTH_SECRET,
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
          if (!passMatch) return null;
          return {
            id: currentUser._id.toString(),
            email: currentUser.email,
            name: currentUser.name,
            imgUrl: currentUser.imgUrl || null,
            bookMark: currentUser.bookMark || null,
            role: currentUser.role || null,

          };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    // GitHubProvider({
    //   clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          imgUrl: user.imgUrl,
          bookMark: user.bookMark,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  // cookies: {
  //   sessionToken: {
  //     name:
  //       process.env.NODE_ENV === "production"
  //         ? "__Secure-next-auth.session-token"
  //         : "next-auth.session-token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
