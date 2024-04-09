import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    PhoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    Hobbies:{
        type:String,
        required:true
    }

})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;