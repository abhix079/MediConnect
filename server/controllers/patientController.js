import Patient from "../models/Patient.js";

// Auto-generate patient ID
const generatePatientId = async () => {
  const count = await Patient.countDocuments();
  const idNumber = (count + 1).toString().padStart(3, '0');
  return `P0MC${idNumber}`;
};

// Register Patient
export const registerPatient = async (req, res) => {
  try {
    const patientId = await generatePatientId();
    const { name, age, gender, mobile, reason, referredBy, address } = req.body;

    const patient = new Patient({
      patientId,
      name,
      age,
      gender,
      mobile,
      reason,
      referredBy,
      address,
      status: "Upcoming", // Set default status here
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error("Error registering patient:", err);
    res.status(500).json({ message: "Failed to register patient", error: err.message });
  }
};

// Get all patients
export const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).js 
}
};




//get patients based on the doctor.................................................................................

export const getPatientByDoctor= async(req,res)=>{
  try{

    const patients = await Patient.find({referredBy:doctorId});


  }

  catch(err){
    console.log("Error in fetching the patients based on doctor",err.message);
    res.status(500).json({
      message:"Patient not found based on the doctor"
    })
  }
};