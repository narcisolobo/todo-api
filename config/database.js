import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * This is a function that connects to a MongoDB database using Mongoose and logs a message if the
 * connection is successful.
 */
async function connectToDb() {
  try {
    // Create a new Mongoose connection
    await mongoose.connect(MONGODB_URI, {
      dbName: 'todosDb',
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectToDb;
