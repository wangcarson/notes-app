import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title: String,
    created: Date,
    updated: Date,
    author: String,
    collaborators: [String],
    tags: [String]
}, {
    timestamps: true
});

const Board = mongoose.model('Board', boardSchema);
export default Board;
