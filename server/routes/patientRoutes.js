import express from "express";

import {
  registerPatient,
  getAllPatient,
  getPatientDetail,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.get("/getAllPatient", getAllPatient);
router.get("/patientDetail", getPatientDetail);

export default router;
