import express from "express";
import {addNewUser,getAllUser} from "../controllers/userController.js";


const router = express.Router();

router.post("/addUser",addNewUser);
router.get("/getUser",getAllUser);


export default router;