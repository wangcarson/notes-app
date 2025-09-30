import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
const bcrypt = require('bcrypt');

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "Email already in use" }, { status: 401 });
    }

    // Create new user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email: email, passwordHash: passwordHash });

    return NextResponse.json({ id: newUser._id, email: newUser.email });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
