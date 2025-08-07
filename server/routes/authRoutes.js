import express from "express";
import { doctorLogin,staffLogin,adminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/doctor", doctorLogin);
router.post("/staff", staffLogin);
router.post("/admin", adminLogin);

export default router; 
 