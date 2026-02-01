import User from "../models/user.model.js";

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
  } catch (error) {
  }
};
