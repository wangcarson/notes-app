'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { dbConnect } from '@/lib/db';
import User from '@/lib/models/User';
import Board, { BoardData, documentToBoard } from '@/lib/models/Board';

/**
 * Fetch and validate user
 * @returns Returns user document or throws error
 */
async function getUserDocument() {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthenticated");

    // Find user by id
    await dbConnect();
    const user = await User.findById(session.user.id);
    if (!user) throw new Error("User not found");

    return user;
}

/**
 * Fetch and validate board
 * @param board_id 
 * @param user
 * @returns Returns board document or throws error
 */
async function getBoardDocument(board_id: string, user: any) {
    // Find board
    const board = await Board.findById(board_id);
    if (!board) throw Error("Board not found");

    // Make sure user has access to board
    if (board_id && !user.boards.includes(board_id)) {
        throw new Error("Unauthorized access to board");
    }

    return board;
}

/**
 * Create empty board for current user
 * @param name 
 * @returns Returns BoardData object if success, otherwise undefined
 */
export async function createBoard(name?: string) {
    try {
        const user = await getUserDocument();
        
        // Create empty board
        const newBoard = await Board.create({
            title: name ?? "Untitled Board",
            author: { id: user._id, name: user.name }, 
        });
        await newBoard.save();
    
        // Link board to user
        user.boards.push(newBoard._id);
        await user.save();

        return documentToBoard(newBoard);
    
    } catch (err) {
        console.error(err);
    }
}

/**
 * Load board using board ID
 * @param board_id 
 * @returns Returns BoardData object if success, otherwise undefined
 */
export async function loadBoard(board_id: string) {    
    try {
        const user = await getUserDocument();
        const board = await getBoardDocument(board_id, user);
        return documentToBoard(board);

    } catch (err) {
        console.error(err);
    }
}

/**
 * Save board for current user
 * @param board_id 
 * @param json 
 * @returns Returns true if success, otherwise false
 */
export async function saveBoard(board_id: string, json: JSON) {
    try {
        const user = await getUserDocument();
        const board = await getBoardDocument(board_id, user);

        // Save board
        board.board = json;
        await board.save();
        return true;
    
    } catch (err) {
        console.error(err);
        return false;
    }
}
