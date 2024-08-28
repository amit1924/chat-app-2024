import multer from "multer";
import UserModel from "../models/User.js";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
});

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const file = req.file ? req.file.filename : null;

    const userExisted = await UserModel.findOne({ username });
    if (userExisted) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
      image: file, // Store the filename of the uploaded image
    });

    await newUser.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const matchUserPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchUserPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "success",
      token: token,
      user: { _id: existingUser._id, username: existingUser.username },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const Verify = (req, res) => {
  return res.status(200).json({ message: "success" });
};

export { Register, Login, Verify };
