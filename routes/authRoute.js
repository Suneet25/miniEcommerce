import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
//router object

let authRoutes = express.Router();

//routing

//REGISTER || method:POST

authRoutes.post("/register", registerController);

//LOGIN || method:POST

authRoutes.post("/login", loginController);

//FORGOT PASSWORD || method:POST

authRoutes.post("/forgot-password", forgotPasswordController);

//testRoutes || method:GET

authRoutes.get("/test", requireSignin, isAdmin, testController);

//Protected user-route auth

authRoutes.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin-route auth

authRoutes.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//updateProfile

authRoutes.put("/profile", requireSignin, updateProfileController);

export default authRoutes;
