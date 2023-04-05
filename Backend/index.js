import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
//config environmental
dotenv.config();

//rest object
let app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("Welcome to ecommerce app");
});

//port

let PORT = process.env.PORT;

//run listen

app.listen(PORT, async () => {
  try {
    await connectDB;
    console.log(`Connected to the DB`.bgMagenta.white);
  } catch (error) {
    console.log(`Error is ${error.message}`.bgRed.white);
  }
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
