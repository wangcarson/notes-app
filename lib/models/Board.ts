import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title: String,
    created: Date,
    updated: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collaborators: [String],
    tags: [String],
    board: JSON
}, {
    timestamps: true,
    collection: "boards"
});

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);
export default Board;
