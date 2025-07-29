import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName : String,
    email : {
        type : String, unique : true, required : true,
    },
    password : String
},{timestamps : true})

export default mongoose.model("User",userSchema);