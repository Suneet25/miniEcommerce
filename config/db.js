import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connectDB = mongoose.connect(process.env.MONGOURL);

export { connectDB };
