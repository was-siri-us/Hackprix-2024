import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String, 
    userEmail: String,
    userId: String
})

const User = mongoose.model("User", userSchema);

export default User;