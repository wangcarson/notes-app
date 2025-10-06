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
        
        // Find user by email
        await dbConnect();
        const user = await User.findOne({ _id: session.user.id });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
    // find all of user's boards
    const allBoardIds = user.boards; // array of ObjectIds

    const allBoards: string [] = [];

    for (let i = 0; i < allBoardIds.length; i++) {
        try {
            const curBoard = await Board.findById(allBoardIds[i]);
            if (curBoard) {
                allBoards.push(curBoard.board); // assuming `board` field holds your data
            }
        } catch (err) {
            console.error("Error loading board ${allBoardIds[i]}:", err);
            continue;
        }
    }
    return NextResponse.json(allBoards); // returns a list of all boards



    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

