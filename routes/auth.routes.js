import express from "express";
import { login, logout, registerUser, sendOtp, verifyOtp } from "../controllers/auth.controller.js";
import { registerUserSchema } from "../validations/auth.schema.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/signup", validateRequest(registerUserSchema), registerUser);
router.post("/signup/otp-request",sendOtp)
router.post("/signup/verify-otp",verifyOtp)
router.post("/login",login)
router.post("/logout",logout)


export default router;
