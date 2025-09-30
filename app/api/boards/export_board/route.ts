// app/api/boards/export_board
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import Board from "@/lib/models/Board";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { board } = await req.json();

        // Find user by email
        const user = await User.findOne({ email: session?.user?.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        const newBoard = await Board.create({ ...board, author: user._id, board: board});

        if (!user.boards) {
            user.boards = []
        }

        // Link board to user
        user.boards.push(newBoard._id);
        await user.save();

        return NextResponse.json({ board: newBoard }, { status: 201 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
