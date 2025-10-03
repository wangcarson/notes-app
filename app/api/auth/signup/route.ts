import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User, { UserData } from "@/lib/models/User";
const bcrypt = require('bcrypt');

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json({ error: "Email already in use" }, { status: 401 });
    }

    // Create new user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name, 
      email: email, 
      passwordHash: passwordHash,
      provider: 'email'
    });

    return NextResponse.json({ id: newUser._id, email: newUser.email });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
