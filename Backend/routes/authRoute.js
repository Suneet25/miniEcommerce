import express from "express";
import { registerController } from "../controllers/authController.js";
//router object

let authRoutes = express.Router();

//routing

//REGISTER || method:Post

authRoutes.post("/register", registerController);

export default authRoutes;
