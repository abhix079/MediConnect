import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/getDoctors", getAllDoctors); //this is used to get all the doctors stored in the database

export default router;
