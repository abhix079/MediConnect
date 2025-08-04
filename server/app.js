import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI?.trim();

app.use(cors());
app.use(express.json());

// DB connection
const connectDB = async () => {
  try {
  
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from server");

});



//my custom routes

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api", doctorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
