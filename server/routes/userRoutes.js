import express from "express";
import { addNewUser, getAllUser, deleteUserById } from "../controllers/userController.js";

const router = express.Router();

router.post("/addUser", addNewUser);
router.get("/getUsers", getAllUser);
router.delete("/:id", deleteUserById);

export default router;
