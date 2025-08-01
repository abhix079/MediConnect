import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { registerPatient, getAllPatient} from "../controllers/patientController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.get("/getAllPatient", getAllPatient);



export default router;