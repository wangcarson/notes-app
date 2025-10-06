import mongoose from 'mongoose';

export interface BoardUser {
    id: string,
    name: string,
}

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
        type: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            name: { type: String, required: true },
        }, 
        required: true 
    },
    collaborators: { 
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            name: { type: String, required: true },
        }], 
        default: [] 
    },
    board: JSON,

    onlineUsers: Number,
    updatedAtUser: String,
    likedBy: {
        type: [String],
        default: []
    },
}, {
    timestamps: true,
    collection: "boards",
});

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);
export default Board;