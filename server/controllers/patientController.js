import Patient from "../models/Patient.js";
import User from "..//models/User.js";
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
      referredBy, // this will be doctor's ID from frontend
      address,
      prescription,
      email,
    } = req.body;

    // Get doctor details for email
    const doctor = await User.findById(referredBy);
    if (!doctor) {
      return res.status(400).json({ message: "Invalid doctor reference" });
    }

    const patient = new Patient({
      patientId,
      name,
      age,
      gender,
      mobile,
      reason,
      referredBy: {
        _id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
      }, // store the full doctor object
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
      const message = `Dear ${name},\n\nYour appointment has been successfully registered with Dr. ${doctor.firstName} ${doctor.lastName}\n\nPatient ID: ${patientId}\nReason: ${reason}\n\nThank you,\nMediConnect Team`;

      try {
        await sendEmail(email, subject, message);
        console.log("Email sent successfully to", email);
      } catch (emailErr) {
        console.error(" Email sending failed:", emailErr.message);
      }
    });
  } catch (err) {
    console.error(" Error registering patient:", err.message);
    res.status(500).json({
      message: "Failed to register patient",
      error: err.message,
    });
  }
};

// Get all patients (for staff)
export const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find().populate(
      "referredBy",
      "firstName lastName"
    );
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
// PATCH /api/patients/:id/cancel
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res
      .status(200)
      .json({ message: "Appointment cancelled", patient: updatedPatient });
  } catch (error) {
    console.error("Cancel error:", error.message);
    res.status(500).json({ message: "Failed to cancel appointment" });
  }
};
//PATCH /api/patients/:id/active

export const activeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        status: "Active",
      },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient set to active status" });
  } catch (err) {
    console.error("Active error:", error.message);
    res.status(500).json({ message: "Failed to set active appointment" });
  }
};

//comlete status
export const completeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        status: "Completed",
      },
      { new: true }
    );
    
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ 
      message: "Patient checkup completed successfully",
      patient: updatedPatient 
    });
  } catch (err) {
    console.error("Complete status error:", err.message);
    res.status(500).json({ message: "Failed to complete patient checkup" });
  }
};





// Get patients based on doctor
export const getPatientByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const patients = await Patient.find({ "referredBy._id": doctorId });

    if (!patients.length) {
      return res
        .status(404)
        .json({ message: "No patients found for this doctor" });
    }

    res.json(patients);
  } catch (error) {
    console.error("Error in getPatientByDoctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
