import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes); // updated path
app.use("/api", doctorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

