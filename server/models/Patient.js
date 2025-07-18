import mongoose, { mongo, Mongoose } from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobile: String,
  symptom: String,
  referredBy: String,
  address: String,
});

const Patient = mongoose.model("Patient",patientSchema);
export default Patient;
