// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";
const bcrypt = require('bcrypt');

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Get request email and password
    const body = await req.json();
    const { email, password } = body;

    // Find user by email
    const user = await User.findOne({ email });

    // Verify email
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 401 });
    }
    if (!user.passwordHash) {
      return NextResponse.json({ error: "Email used with OAuth provider" }, { status: 401 });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Return user object (NextAuth expects at least an id)
    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
