import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: string;
        };
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
