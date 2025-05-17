import clientPromise from "@/lib/connectiondb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db("stock-z");
          const userCollection = db.collection("users");

          const user = await userCollection.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("Login error:", error.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },

    // async signIn({ account, profile }) {
    //   if (account?.provider === "github") {
    //     const client = await clientPromise;
    //     const db = client.db("stock-z");
    //     const userCollection = db.collection("users");

    //     const existingUser = await userCollection.findOne({ email: profile.email });
    //     if (!existingUser) {
    //       await userCollection.insertOne({
    //         username: profile.name,
    //         email: profile.email,
    //         password: null,
    //       });
    //     }
    //   }
    //   return true;
    // },
  },

  pages: {
    signIn: "/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
