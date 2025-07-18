import bcrypt from "bcrypt";
import User from "../models/User.js";

const staffLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId, role: "Staff" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Staff login successful" ,
       name:user.firstName,
    });
  } catch (err) {
    console.error("Staff login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default staffLogin;
