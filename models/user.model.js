import mongoose from "mongoose";
import bcypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return 
  
  this.password = await bcypt.hash(this.password, 10);
});

const User = new mongoose.model("User", userSchema);

export default User;
