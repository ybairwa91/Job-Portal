import express from "express";

import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routes
// REGISTER MEANS SIGN UP
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

///export
export default router;
