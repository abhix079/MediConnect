import bcrypt from "bcrypt";
import User from "../models/User.js";

const adminLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId, role: "Admin" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Admin login successful" ,
      name:user.firstName,

    });
  } catch (err) {
    console.error("Admin login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default adminLogin;
