import slugify from "slugify";
import subcategoryModel from "../../../../DB/model/subcategory.model.js";
import cloudinary from "../../../services/cloudinary.js";
import {pagination} from "../../../services/pagination.js"
import categoryModel from "../../../../DB/model/category.model.js";
export const createSubCategory = async(req,res,next)=>{
        if(req.file){
            const {name}=req.body;
            const {categoryId}=req.params;
            if(name){
                const category = await categoryModel.findById(categoryId);
                if(!category){
                    next(new Error("not found category",{cause:404}));
                }else{
                    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/subcategory/${categoryId}`});
                    const slug = slugify(name); //write the name "yazan doha" as this type "yazan-doha"
                    const subcategory = await subcategoryModel.create({image:secure_url,name,ImagePublicId:public_id,slug,createdBy:req.user._id,categoryId});
                    if(subcategory){
                        res.status(200).json({message:"sccess add sub category",subcategory});
                    }else{
                        res.status(400).json({message:"fail add subcategory"})
                    } 
                }
            }else{
                res.status(401).json({message:"name must be not null"});
            }
        }else{
            res.status(400).json({message:"image is require"});
        }
}

export const updateSubCategory = async(req,res,next)=>{
    // in this function thear is a problem : when i send id of sub category error then the image will store in the cloudinary
    const {categoryId,id}=req.params;
    // res.status(200).json({message:"success",categoryId,id});
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/subcategory/${categoryId}`});
        req.body.image=secure_url;
        req.body.ImagePublicId=public_id;
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name);
    }
    const subcategory = await subcategoryModel.findOneAndUpdate({_id:id,categoryId:categoryId},req.body,{new:false});

    if(req.file){
     await cloudinary.uploader.destroy(subcategory.ImagePublicId);   
    }
    if(subcategory){
        res.status(200).json({message:"success",subcategory});
    }else{
        res.status(400).json({message:"fail update subcategory"})
    }
}

export const allSubCategory = async(req,res,next)=>{
    const {page,size} = req.query;
    const {limit,skip}=pagination(page,size);
    
    const allSubCategory = await subcategoryModel.find({}).select('-_id').limit(limit).skip(skip).populate({ // this populate is to show what is the name of the user create this category
        path:"createdBy",
        select:"-_id userName"
    });
    if(allSubCategory){
        res.status(200).json({message:"success",allSubCategory});
    }else{
        res.status(400).json({message:"fail"});
    }
}
export const getSubCat=async(req,res,next)=>{
    const {id} = req.params;
    const subcategory = await subcategoryModel.findOne({_id:id}).populate({
        path:"createdBy",
        select:"userName"
    }).populate({
        path:"categoryId",
        select:"name"
    });
    if(subcategory){
        res.status(200).json({message:"success",subcategory});
    }else{
        res.status(400).json({message:"fail"});
    }
}

export const aaa=async(req,res,next)=>{
        // const {id}=req.params;
            res.status(400).json({message:"sucssesssss"});
    }
// export const getCat1=async(req,res,next)=>{
//     const {id}=req.params;
//         res.status(400).json({message:"faill",id});
// }