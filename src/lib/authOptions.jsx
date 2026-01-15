import { LoginUser } from "@/actions/server/Auth";
import { collections, dbConnect } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const user = await LoginUser({
          email: credentials.email,
          password: credentials.password,
        });
        // Return null if user data could not be retrieved
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isExist = await dbConnect(collections.USERS).findOne({
        email: user.email,
      });
      if (isExist) {
        return true;
      }

      const newUser = {
        provider: account?.provider,
        email: user.email,
        name: user.name,
        Photo: user.image,
        role: "user",
      };
      const result = await dbConnect(collections.USERS).insertOne(newUser);

      return result.acknowledged;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account.provider == "google") {
          const dbUser = await dbConnect(collections.USERS).findOne({
            email: user.email,
          });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
