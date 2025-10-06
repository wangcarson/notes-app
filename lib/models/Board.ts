import mongoose from 'mongoose';

export interface BoardUser {
    id: string,
    name: string,
}

const boardUserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
});

export interface BoardData {
    _id: string,
    title: string,
    author: BoardUser,
    collaborators: BoardUser[],
    board: JSON,

    onlineUsers?: number,
    createdAt?: Date,
    updatedAt?: Date,
    updatedAtUser?: BoardUser,
    likedBy: string[], // ids only
}

const boardSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: boardUserSchema, 
        required: true 
    },
    collaborators: { 
        type: [boardUserSchema], 
        default: [] 
    },
    board: JSON,

    onlineUsers: Number,
    updatedAtUser: boardUserSchema,
    likedBy: {
        type: [String],
        default: []
    },
}, {
    timestamps: true,
    collection: "boards",
});

const Board = mongoose.models.User || mongoose.model('Board', boardSchema);
export default Board;

// Helper functions
export function documentToBoardUser(data: any): BoardUser {
    return {
        id: data.id.toString,
        name: data.name
    };
}

export function documentToBoard(data: any): BoardData {
    // Convert subfields to BoardUser
    const author = documentToBoardUser(data.author);
    const collaborators = data.collaborators.map(documentToBoardUser);
    const updatedAtUser = data.updatedAtUser
        ? documentToBoardUser(data.updatedAtUser) : undefined;

    return {
        _id: data._id.toString(),
        title: data.title,
        author,
        collaborators,
        board: data.board,
        onlineUsers: data.onlineUsers,
        updatedAtUser,
        likedBy: data.likedBy || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
}