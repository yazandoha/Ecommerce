import { Schema, model } from "mongoose";
const userSchema = new Schema({
    userName:{
        type:String,
        require:[true,'username is require'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25']
    },
    email:{
        type:String,
        require:[true,'email is require'],
        unique:[true,'email is exists']
    },
    password:{
        type:String,
        require:[true,'password is require']
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    image:String,   
},{timestamps:true})

const userModel = model('user',userSchema);
export default userModel;