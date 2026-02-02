import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import sendEmail from "../service/email.service.js";
import { readFile } from "node:fs/promises";
import { generateOtp } from "../utils/otp.util.js";
import { success } from "zod";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.validatedBody;
    const account = await User.findOne({ email });
    if (account) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({
      success: true,
      message:
        "Account created . Please verify your email to activate your account.",
    });
  } catch (error) {}
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, isVerified: false });
    if (!user) {
      return res
        .status(200)
        .json({ success: true, message: "OTP sent to your email address" });
    }

    const otp = generateOtp();
    await Otp.create({ email, otp });

    let html = await readFile("./templates/emails/verifyEmail.html", "utf-8");
    html = html.replaceAll("{{APP_NAME}}", process.env.APP_NAME);
    html = html.replaceAll("{{OTP_CODE}}", otp);
    ((html = html.replaceAll("{{SUPPORT_EMAIL}}", process.env.SUPPORT_EMAIL)),
      (html = html.replaceAll("{{YEAR}}", new Date().getFullYear())));

    await sendEmail({
      to: email,
      from: process.env.EMAIL,
      subject: "Your verification code",
      html,
    });
    return res.status(200).json({ message: "OTP sent to your email address" });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid or expired OTP. Please request a new OTP." });
    }
    const isOtpCorrect = await bcrypt.compare(`${otp}`, otpRecord.otp);
    if (!isOtpCorrect) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid or expired OTP. Please request a new OTP." });
    }

    const user = await User.findOne({ email, isVerified: false });
    //handle: if  user not found
    user.isVerified = true;
    await user.save();
    sendWelcomeEmail({name:user.name,email:user.email})

    return res.status(200).json({ success: true, message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.log(error);
  }
};



export const sendWelcomeEmail = async ({name,email}) => {
  try {
    const from = process.env.EMAIL
    const to = email
    const subject = "You're all set! Let’s get started ✨"
    let html = await readFile("./templates/emails/welcomeEmail.html","utf-8")
    html = html.replaceAll("{{appName}}",process.env.APP_NAME)
    html = html.replaceAll("{{year}}",new Date().getFullYear())
    html = html.replaceAll("{{name}}",name)
    html = html.replaceAll("{{supportEmail}}",process.env.SUPPORT_EMAIL)
    await sendEmail({from,to,subject,html})
    
  } catch (error) {
    console.log(error);
    
  }
}
