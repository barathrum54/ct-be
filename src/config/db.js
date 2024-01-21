import mongoose from 'mongoose';

// Function to connect to the database
const connectDB = async () => {
  console.log('MongoDB Connecting', process.env.MONGO_URI)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
