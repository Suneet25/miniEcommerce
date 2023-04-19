import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserModel from "../models/usersModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { json } from "express";
dotenv.config();

//register user
export let registerController = async (req, res) => {
  try {
    let { name, email, password, phone, address, answer } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!phone) {
      return res.send({ message: "Password is required" });
    }
    if (!address) {
      return res.send({ message: "Adress no is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    //user

    let existingUser = await UserModel.findOne({ email });

    //check

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists.Please login !",
      });
    }
    //register user
    let hashedPassword = await hashPassword(password);
    //save user

    let user = await new UserModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    await res.status(201).send({
      success: true,
      message: "User has been registered successfully !",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in registration", error });
  }
};

//login user
export let loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.send({ message: "Email and Password are required" });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Email is not registered" });
    }

    //match

    let match = await comparePassword(password, user.password);

    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Enter correct password" });
    }
    //token

    let token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      success: true,
      message: "Login successfull !",
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};

//forgotPasswordController

export let forgotPasswordController = async (req, res) => {
  try {
    let { email, answer, newPassword } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }
    //check
    let user = await UserModel.findOne({ email, answer });

    //validation

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Wrong email or answer" });
    }

    let hashed = await hashPassword(newPassword);

    await UserModel.findByIdAndUpdate(user._id, { password: hashed });

    res
      .status(200)
      .send({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};

//testController

export let testController = async (req, res) => {
  res.send("Protected Routes");
};

//updateProfileController

export let updateProfileController = async (req, res) => {
  try {
    let { name, password, phone, address } = req.body;
    let user = await UserModel.findById(req.user._id);
    if (password && password.length < 6) {
      res.json({
        error: "Password is required ans should be 6 character long",
      });
    }

    let hashedPassword = password ? await hashPassword(password) : undefined;
    let updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating profile",
      error,
    });
  }
};
