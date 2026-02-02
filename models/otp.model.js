import mongoose from "mongoose";
import bcrypt from "bcrypt"

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:600
    }

})


otpSchema.pre("save",async function(){
    console.log(this);
    this.otp = await bcrypt.hash(this.otp,10)
    console.log(this);

})

const Otp = mongoose.model("Otp",otpSchema)
export default Otp