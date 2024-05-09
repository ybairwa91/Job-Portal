import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userControllers.js";

//router object
const router = express.Router();

//routes

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
