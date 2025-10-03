import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");

export async function dbConnect() {
    await mongoose.connect(process.env.MONGODB_URI!);
}
