import { Schema, Types, model } from "mongoose";
const subcategorySchema = new Schema({
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
    slug:String,
    ImagePublicId:String,
    categoryId:{
        type:Types.ObjectId,
        ref:'category'
    }   
},{timestamps:true})

const subcategoryModel = model('subcategory',subcategorySchema);
export default subcategoryModel;