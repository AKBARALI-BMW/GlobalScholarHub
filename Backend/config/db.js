import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// const user = getUser(); // or from context, props, etc.
// console.log(user.fullName); // ❌ error here if user is null


const connectDB = async () => {
  try {
    // Use the connection URI from the environment variable
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable not set');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected Successfully 🚀');
  } catch (error) {
    console.error(`Error connecting MongoDB: ${error.message}`);
    process.exit(1); // Exit the process if the connection fails
    // console.log('User:', user);

  }
};

export default connectDB;
