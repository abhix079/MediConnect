import express from "express";
import doctorLogin from "../controllers/doctorLogin.js";
import staffLogin from "../controllers/staffLogin.js";
import adminLogin from "../controllers/adminLogin.js";

const router = express.Router();

router.post("/doctor", doctorLogin);
router.post("/staff", staffLogin);
router.post("/admin", adminLogin);

export default router;
 