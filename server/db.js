import mongoose from "mongoose";

let connectionPromise;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is missing");
  }
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    }).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }
  await connectionPromise;
}