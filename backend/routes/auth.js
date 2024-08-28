import express from "express";
import {
  Register,
  upload,
  Login,
  Verify,
} from "../controllers/auth.controller.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/register", upload.single("image"), Register);
router.post("/login", Login);
router.get("/verify", verifyUser, Verify);

export default router;
