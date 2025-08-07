import Patient from "../models/Patient.js";
import sendEmail from "../utils/sendEmail.js";

// Auto-generate patient ID
const generatePatientId = async () => {
  const count = await Patient.countDocuments();
  const idNumber = (count + 1).toString().padStart(3, "0");
  return `P0MC${idNumber}`;
};

// Register Patient (for staff)
export const registerPatient = async (req, res) => {
  try {
    const patientId = await generatePatientId();
    const {
      name,
      age,
      gender,
      mobile,
      reason,
      referredBy,
      address,
      prescription,
      email,
    } = req.body;

    const patient = new Patient({
      patientId,
      name,
      age,
      gender,
      mobile,
      reason,
      referredBy,
      address,
      email,
      prescription,
      status: "Upcoming",
    });

    await patient.save();

    // Send response immediately
    res.status(201).json({ message: "Patient registered", patient });

    // Send email in the background
    setImmediate(async () => {
      const subject = "Appointment Confirmation - MediConnect";
      const message = `Dear ${name},\n\nYour appointment has been successfully registered with Dr. ${referredBy}\n\nPatient ID: ${patientId}\nReason: ${reason}\n\nThank you,\nMediConnect Team`;

      try {
        await sendEmail(email, subject, message);
        console.log("✅ Email sent successfully to", email);
      } catch (emailErr) {
        console.error("❌ Email sending failed:", emailErr.message);
      }
    });

  } catch (err) {
    console.error("❌ Error registering patient:", err.message);
    res.status(500).json({
      message: "Failed to register patient",
      error: err.message,
    });
  }
};

// Get all patients (for staff)
export const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("❌ Error fetching patients:", error.message);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};
// Get all patient records by mobile number
export const getPatientDetail = async (req, res) => {
  const mobile = req.query.mobile || req.body.mobile;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    const patients = await Patient.find({ mobile });

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No records found for this mobile number" });
    }

    res.status(200).json({
      message: "Patient records found",
      patients, // returns array of patient objects
    });
  } catch (err) {
    console.error("❌ Error in finding patient details:", err.message);
    res.status(500).json({
      message: "Failed to fetch patient details",
      error: err.message,
    });
  }
};

// Get patients based on doctor
export const getPatientByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const patients = await Patient.find({ referredBy: doctorId });
    res.status(200).json(patients);
  } catch (err) {
    console.log("❌ Error in fetching patients based on doctor:", err.message);
    res.status(500).json({
      message: "Patient not found based on the doctor",
    });
  }
};
