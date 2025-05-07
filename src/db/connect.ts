import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url, {
        dbName: "sao-do-course",
    });
    console.log("✅ MongoDB connection successful", url);
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error);
  }
};
