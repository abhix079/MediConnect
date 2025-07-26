import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateUserId = async (role) => {
  let prefix = "MC0";
  switch (role) {
    case "Doctor":
      prefix += "D";
      break;
    case "Staff":
      prefix += "S";
      break;
    case "Admin":
      prefix += "A";
      break;
    default:
      throw new Error("Invalid role");
  }

  const count = await User.countDocuments({ role });
  const number = String(count + 1).padStart(3, "0");

  return `${prefix}${number}`;
};

const addNewUser = async (req, res) => {
  const { firstName, lastName, age, phone, department, role, password, email, gender } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: "User with same phone or email already exists" });
    }

    const userId = await generateUserId(role);
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      age,
      phone,
      department,
      role,
      password: hashedPass,
      userId,
      email,
      gender,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "2h" }
    );

    res.status(201).json({ message: "User created successfully", userId, token });
  } catch (err) {
    console.error("Error in adding user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users.length) return res.status(404).json({ message: "No users found" });
    res.status(200).json({ message: "Displaying all users", users });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export { addNewUser, getAllUser, deleteUserById };
