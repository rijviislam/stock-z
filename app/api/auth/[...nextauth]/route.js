// import connectDb from "@/lib/connectDb";
import connectDb from "@/lib/connectDb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           required: true,
//           placeholder: "Enter your email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           required: true,
//           placeholder: "Enter your password",
//         },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         if (!credentials) {
//           return null;
//         }
//         if (email) {
//           const db = await connectDb();
//           const currentUser = await db.collection("users").findOne({ email });
//           // console.log(currentUser, "CurrentUser");
//           // const currUser = users.find((userEmail) => userEmail.email === email);
//           // console.log("userr", currUser);
//           if (currentUser) {
//             if (currentUser.password === password) {
//               return currentUser;
//             }
//           }
//         }
//         return null;
//       },
//     }),
//     // GoogleProvider({
//     //   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.NEXT_PUBLICGOOGLE_CLIENT_SECRET,
//     // }),
//   ],
//   callbacks: {
//     async jwt({ token, account, user }) {
//       // Persist the OAuth access_token and or the user id to the token right after signin
//       if (account) {
//         token.type = user.type;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.type = token.type;
//       return session;
//     },
//   },
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

const handler = NextAuth({
  session: {
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
