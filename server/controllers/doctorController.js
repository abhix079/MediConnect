import User from "../models/User.js";

export const getAllDoctors= async(req,res)=>{
    try {
    const doctors = await User.find({ role: "Doctor" }).select("firstName lastName");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
}