import bcrypt from "bcrypt";
import User from "../models/User.js";

const addNewUser = async (req, res) => {
  const { name, age, userId, phone, department, role, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ userId }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User or Phone No. already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      age,
      userId,
      phone,
      department,
      role,
      password: hashedPass,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log("Error in adding user:", err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get user
const getAllUser = async (req, res) => {


  try {
    const user = await User.find().select("-password");
    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    res.status(200).json({
      message: "Displaying all users",
      user,
    });
  } catch (err) {
    console.log("No user found:", err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { addNewUser, getAllUser };
