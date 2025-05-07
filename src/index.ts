import express from "express";
const app = express();
import { connectDB } from "./db/connect";
import { notFound } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import authRoute from "./routes/auth";
import protectedRoutes from "./routes/protected";
import dotenv from "dotenv";
import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  hello: {
    type: String,
    required: true,
  },
});

const modelTest = mongoose.model("Test", testSchema);

dotenv.config();

const port = process.env.PORT || 3000;
console.log("process.env.PORT", process.env.PORT);

// middleware
app.use(express.json());

// Routes
app.use("/api/user", authRoute);
app.use("/api/protected", protectedRoutes); // just for example
app.use("/", async (req, res) => {
  try {
    const data = await modelTest.find({});
    console.log("data", data);
    res.json(data);
} catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
