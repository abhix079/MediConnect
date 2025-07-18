import bcrypt from "bcrypt";
import User from "../models/User.js";

const doctorLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId, role: "Doctor" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Send name in response
    res.status(200).json({
      message: "Doctor login successful",
      name: user.firstName, //this is used to set the name in the navbar
    });
  } catch (err) {
    console.error("Doctor login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default doctorLogin;
