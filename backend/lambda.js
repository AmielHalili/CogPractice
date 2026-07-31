// lambda.js — AWS Lambda entry point, wraps the existing Express app.
import serverlessHttp from 'serverless-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

// Reused across warm invocations so we don't reconnect on every request.
let connectionPromise = null;

const connectToDatabase = async () => {
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

const httpHandler = serverlessHttp(app);

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return httpHandler(event, context);
};
