import mongoose from "mongoose";

const user = new mongoose.Schema({
    username:{
        type:String, unique:true
    },
    email:{
        type:String, unique:true}
        ,
    password:{
        type:String,
        unique:true
    },    
    isAdmin:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("User", user);