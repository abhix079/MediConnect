import express from "express";
import { doctorLogin,staffLogin,adminLogin } from "../controllers/authController.js";

const router = express.Router();
//route for doctor login
router.post("/doctor", doctorLogin);
//route for staff login
router.post("/staff", staffLogin);
//route for admin lofin
router.post("/admin", adminLogin);

export default router; 
 