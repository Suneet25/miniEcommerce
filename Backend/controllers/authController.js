import { hashPassword } from "../helper/authHelper.js";
import UserModel from "../models/usersModel.js";
export let registerController = async (req, res) => {
  try {
    let { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!phone) {
      return res.send({ error: "Password is required" });
    }
    if (!address) {
      return res.send({ error: "Adress no is required" });
    }
    //user

    let existingUser = await UserModel.findOne({ email });

    //check

    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, message: "User already exists.Please login !" });
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
