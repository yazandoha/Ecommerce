import { Schema, Types, model } from "mongoose";
const productSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is require'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25'],
        trim:true,
    },
    slug:String,
    description:String,
    images:[String], // array of images
    ImagePublicIds:[String],
    amount:{ //كمية
        type:Number,
        default:0
    },
    soldItems:{ //الكمية المباعة
        type:Number,
        default:0
    },
    stock:{ //متبقي
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0
    },
    finalPrice:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    colors:{type:[String]},
    sizes:{type:[String],enum:['s','m','l','xl']},
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:true
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'category',
    },
    subcategoryId:{
        type:Types.ObjectId,
        ref:'subcategory',
    },
    brandId:{
        type:Types.ObjectId,
        ref:'brand',
    },
       
},{
    timestamps:true,
})

const productModel = model('product',productSchema);
export default productModel;