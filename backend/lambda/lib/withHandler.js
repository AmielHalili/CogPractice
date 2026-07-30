// lambda/lib/withHandler.js
import { connectToDatabase } from './db.js';
import { failure } from './http.js';

// Wraps a route handler with DB connection reuse and uniform error -> HTTP mapping,
// mirroring the try/catch-per-route pattern the Express routes used.
export const withHandler = (fn, { errorStatus = 400 } = {}) => async (event) => {
  try {
    await connectToDatabase();
    return await fn(event);
  } catch (error) {
    return failure(error.message, errorStatus);
  }
};
