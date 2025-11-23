import mongoose, { Mongoose } from "mongoose";

/**
 * MongoDB connection state interface.
 * This prevents TypeScript from falling back to `any`.
 */
interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

/**
 * Global object extension for cached connection.
 * This ensures hot reloads in development don't create new connections.
 */
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseConnection | undefined;
}

/**
 * Use a global cached connection in development.
 * Helps prevent multiple Mongoose connections caused by Next.js hot reload.
 */
let cached: MongooseConnection = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

/**
 * Connect to MongoDB using Mongoose (cached).
 * This function is safe to call in any API route or server component.
 */
export async function connectDB(): Promise<Mongoose> {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("❌ Missing MONGODB_URI in environment variables");
    }

    // If already connected, return the cached connection
    if (cached.conn) return cached.conn;

    // Otherwise, create a new connection promise
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    // Wait for the connection and store it in cache
    cached.conn = await cached.promise;

    return cached.conn;
}
