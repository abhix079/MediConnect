import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // Allow frontend requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
