import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); //here we are configuring the dotenv to access the .env content
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Routes

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/api/v1",userRoutes);
//server connection code 

try {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
  });
} catch (err) {
  console.log("Internal server error", err.message);
}
