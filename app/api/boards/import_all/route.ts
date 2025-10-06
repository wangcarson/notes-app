import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/lib/db";
import Board, { BoardData, BoardUser, documentToBoard } from "@/lib/models/Board";
import User from "@/lib/models/User";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(req?: NextRequest) {
    try {        
        // Get user session
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = session.user.id;
        
        // Find user by id
        await dbConnect();
        const user = await User.findOne({ _id: uid });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Find all boards
        const boards = (await Board.find({
            $or: [
                { "author.id": new mongoose.Types.ObjectId(uid) },
                { "collaborators.id": new mongoose.Types.ObjectId(uid) }
            ]
        })).map(documentToBoard);

        return NextResponse.json(boards);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

