// middleware.ts
import { withAuth } from "next-auth/middleware";

// redirect to home if not authenticated
export default withAuth({
  pages: {
    signIn: "/home",
  },
});

// protected pages
export const config = {
  matcher: ["/dashboard/:path*"], 
};
