import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    created: Date,
    updated: Date,
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
    },
    collaborators: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
    }],
    tags: [String],
    board: JSON
}, {
    timestamps: true,
    collection: "boards",
});

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);
export default Board;
