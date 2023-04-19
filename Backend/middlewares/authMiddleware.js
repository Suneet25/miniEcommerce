import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/usersModel.js";
dotenv.config();

//Protected route tokenbase
export let requireSignin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    let decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//adminAccess

export let isAdmin = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user._id);

    if (user.role !== 1) {
      res.status(401).send({ success: false, message: "Unauthorised access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(err);
    res
      .status(401)
      .send({ success: false, message: "Error in admin middleware" });
  }
};
