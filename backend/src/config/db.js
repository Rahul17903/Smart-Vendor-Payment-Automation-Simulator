import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process if DB fails
  }

  // Handle connection events
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB reconnected successfully.");
  });
};

export default connectDB;
