import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/lib/db";
import Board, { BoardData, BoardUser, documentToBoard } from "@/lib/models/Board";
import User from "@/lib/models/User";
import { authOptions } from "../../../auth/[...nextauth]/route";
import mongoose from "mongoose";

interface RouteParams {
    board_id: string;
}

// Get a board by ID
export async function GET(req: NextRequest, { params }: { params: RouteParams }) {
    // Get board id from params
    const { board_id } = await params;
    console.log(board_id);

    try {
        // Get user session
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
        }
        const uid = session.user.id;
        
        // Find user by id
        await dbConnect();
        const user = await User.findOne({ _id: uid });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Make sure user has access to board
        if (!user.boards.includes(board_id)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        // Find board
        const board = await Board.findById(board_id);

        return NextResponse.json(documentToBoard(board));

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
