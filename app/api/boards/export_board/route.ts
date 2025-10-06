// app/api/boards/export_board
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/lib/db";
import Board from "@/lib/models/Board";
import User from "@/lib/models/User";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try {
        // Get user session
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        // Find user by id
        await dbConnect();
        const user = await User.findOne({ _id: session.user.id });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Upload board to database
        const { board } = await req.json();
        const newBoard = await Board.create({ ...board, author: { id: user._id, name: user.name }, board: board});

        // Link board to user
        user.boards.push(newBoard._id);
        await user.save();

        return NextResponse.json({ board: newBoard }, { status: 201 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
