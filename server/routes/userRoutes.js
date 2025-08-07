import express from "express";
import { addNewUser, getAllUser, removeUser} from "../controllers/userController.js";

const router = express.Router();

router.post("/addUser", addNewUser);
router.get("/getUsers", getAllUser);
router.delete("/delUser/:id",removeUser);


export default router;
