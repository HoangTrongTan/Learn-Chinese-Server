import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error);
  }
};
