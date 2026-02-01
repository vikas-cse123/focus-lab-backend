import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { registerUserSchema } from "../validations/auth.schema.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/signup", validateRequest(registerUserSchema), registerUser);

export default router;
