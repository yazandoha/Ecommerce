import { Schema, Types, model } from "mongoose";
const categorySchema = new Schema({
    name:{
        type:String,
        required:[true,'name is require'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25'],
        unique:true,
    },
    image:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:true
    },
    slug:String   
},{timestamps:true})

const categoryModel = model('category',categorySchema);
export default categoryModel;