import Patient from "../models/Patient.js";

// Auto-generate patient ID
const generatePatientId = async () => {
  const count = await Patient.countDocuments();
  const idNumber = (count + 1).toString().padStart(3, "0");
  return `P0MC${idNumber}`;
};

// Register Patient........................this is for the staff
export const registerPatient = async (req, res) => {
  try {
    const patientId = await generatePatientId();
    const { name, age, gender, mobile, reason, referredBy, address, prescription } = req.body;

    const patient = new Patient({
      patientId,
      name,
      age,
      gender,
      mobile,
      reason,
      referredBy,
      address,
      prescription, // will fall back to schema default if undefined
      status: "Upcoming", // Set default status here
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error("Error registering patient:", err);
    res
      .status(500)
      .json({ message: "Failed to register patient", error: err.message });
  }
};

// Get all patients  ------this is for the staff ...........................
export const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).js;
  }
};

// this is the controller that patient will use to see all the appointment history
export const getPatientDetail = async (req, res) => {
  // Support query param ?mobile=...
  const mobile = req.query.mobile || req.body.mobile;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    const patient = await Patient.findOne({ mobile });
    if (!patient) {
      return res.status(404).json({ message: "No record found" });
    }

    res.status(200).json({ message: "Patient record found", patient });
  } catch (err) {
    console.error("Error in finding patient details", err.message);
    res.status(500).json({ message: "Patient detail not found", error: err.message });
  }
};

// get patients based on the doctor.................................................................................

export const getPatientByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params; // assuming doctorId comes from params
    const patients = await Patient.find({ referredBy: doctorId });
    res.status(200).json(patients);
  } catch (err) {
    console.log("Error in fetching the patients based on doctor", err.message);
    res.status(500).json({
      message: "Patient not found based on the doctor",
    });
  }
};
