import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";

// https://next-auth.js.org/getting-started/example
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // OAuth: https://next-auth.js.org/configuration/providers/oauth
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    // Credentials: https://next-auth.js.org/configuration/providers/credentials
    CredentialsProvider({
      // The name to display on the sign in form
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Logic for verifying credentials
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        throw new Error(user.error || "Login failed");
      }
    }),
  ],

  // Callbacks: https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // Control if a user is able to sign in
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account?.provider === 'google') {
        // Check if user already exists
        var existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user if needed
          existingUser = await User.create({
            name: profile?.name,
            email: user.email,
            provider: 'google',
            identities: [{
              provider: 'google',
              providerUserId: profile?.sub
            }],
          });

        } else if (existingUser.provider != 'google') {
          // Return to modal if email used with other provider
          return '/home?error=provider_mismatch'
        }

        user.id = existingUser._id.toString();
      }
      return true;
    },

    // https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  
  session: {
    strategy: "jwt"
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
