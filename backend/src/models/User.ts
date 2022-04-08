import mongoose, {Document} from "mongoose";
import { UserInterface } from "src/interfaces/UserInterface";


export type UserDoc = Document & {
    orders: UserInterface[];
}

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

export default mongoose.model<UserDoc>("User", user);