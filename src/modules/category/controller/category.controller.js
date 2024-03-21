import slugify from "slugify";
import categoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const createCategory = async(req,res,next)=>{
        if(req.file){
            const {name}=req.body;
            if(name){
                const slug = slugify(name);
                const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/category'});
                const category = await categoryModel.create({image:secure_url,name,slug,createdBy:req.user._id});
                if(category){
                    res.status(200).json({message:"sccess user",category});
                }else{
                    res.status(400).json({message:""})
                }
            }else{
                res.status(401).json({message:"name must be not null"});
            }
        }else{
            res.status(400).json({message:"image is require"});
        }
}