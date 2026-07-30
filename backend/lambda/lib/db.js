// lambda/lib/db.js
import mongoose from 'mongoose';

// Reused across warm Lambda invocations so we don't reconnect on every call.
let connectionPromise = null;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    mongoose.set('bufferCommands', false);
    connectionPromise = mongoose.connect(process.env.MONGO_URI).catch((error) => {
      connectionPromise = null; // allow retry on next invocation
      throw error;
    });
  }

  return connectionPromise;
};
