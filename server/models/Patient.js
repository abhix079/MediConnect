import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  age: Number,
  gender: String,
  mobile: String,
  reason: String,
  
  referredBy: String,
  address: String,
  status: {
    type: String,
    enum: ["Upcoming", "Active", "Pending", "Completed", "Cancelled"],
    default: "Upcoming",
  },
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
