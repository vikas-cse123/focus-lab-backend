import express from "express";
import { registerUser, sendOtp } from "../controllers/auth.controller.js";
import { registerUserSchema } from "../validations/auth.schema.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/signup", validateRequest(registerUserSchema), registerUser);
router.post("/signup/otp-request",sendOtp)


export default router;
