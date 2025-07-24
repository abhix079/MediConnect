import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { registerPatient, getAllPatient, getDoctorPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.get("/getAllPatient", getAllPatient);
router.get("/getPatient",authMiddleware,getDoctorPatient);

export default router;