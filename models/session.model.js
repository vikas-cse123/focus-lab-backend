import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true,
        expires:0
      
    }

})

const Session = new mongoose.model("Session",sessionSchema)
export default Session