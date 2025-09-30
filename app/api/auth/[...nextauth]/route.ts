import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// https://next-auth.js.org/getting-started/example
const handler = NextAuth({
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
})

export { handler as GET, handler as POST }

