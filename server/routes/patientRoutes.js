import express from "express";
import {
  registerPatient,
  getAllPatient,
  getPatientDetail,
  updateStatus,
  getPatientByDoctor,
  activeStatus, // ✅ Import the new controller
} from "../controllers/patientController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Register a new patient
router.post("/register", registerPatient);

// Get all patients
router.get("/getAllPatient", getAllPatient);

// Get details of a specific patient
router.get("/patientDetail", getPatientDetail);

// Cancel patient status
router.patch("/:id/cancel", updateStatus); 

//Active patient status
router.patch("/:id/active",activeStatus);   

// ✅ Get patients referred to a specific doctor
router.get("/doctor/:doctorId", verifyToken, getPatientByDoctor);
export default router;
