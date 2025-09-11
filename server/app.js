import { createServer } from "http";
import { Server } from "socket.io";
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
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "https://mediconectweb.vercel.app"
    ],
    methods: ["GET", "POST"],
  },
});


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

// Routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api", doctorRoutes);

app.get("/", (req, res) => res.send("Hello from server"));

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "The server is pinged successfully" });
});


io.on("connection", (socket) => {

  socket.on("join", ({ role, name }) => {
    socket.join("global-room"); 
  });

  socket.on("sendMessage", (data) => {
    io.to("global-room").emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
  
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
