import express from "express";
import {addNewUser,getAllUser} from "../controllers/userController.js";


const router = express.Router();

router.post("/addUser",addNewUser);
router.get("/getUsers",getAllUser);


export default router;