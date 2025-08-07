import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    referredBy: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
      default: "NA",
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Active", "Pending", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
