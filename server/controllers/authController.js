import bcrypt from "bcrypt";

import User from "../models/User.js";

const userLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "No user exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
  
    res.status(200).json({
      message: "Login successful"
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userLogin;
