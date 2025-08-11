import express from "express";
import {
  registerPatient,
  getAllPatient,
  getPatientDetail,
  updateStatus,
  getPatientByDoctor, // ✅ Import the new controller
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

// ✅ Get patients referred to a specific doctor
router.get("/doctor/:doctorId", verifyToken, getPatientByDoctor);
export default router;
