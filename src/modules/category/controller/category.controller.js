import slugify from "slugify";
import categoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import {pagination} from "../../../services/pagination.js";
export const createCategory = async(req,res,next)=>{
        if(req.file){
            const {name}=req.body;
            if(name){
                 //hear mush check the name of category is uniqe befor add the category in the DB
                 const slug = slugify(name); //write the name "yazan doha" as this type "yazan-doha"
                 const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/category'});
                 const category = await categoryModel.create({image:secure_url,name,ImagePublicId:public_id,slug,createdBy:req.user._id});
 
                if(category){
                    res.status(200).json({message:"sccess user",category});
                }else{
                    res.status(400).json({message:"fail add category"});
                }
            }else{
                res.status(401).json({message:"name must be not null"});
            }
        }else{
            res.status(400).json({message:"image is require"});
        }
}

export const updateCategory = async(req,res,next)=>{
    // let token = req.headers;
    // let id = req.params;
    // res.json({message:"success",id});
    const {id}=req.params;
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/category'});
        req.body.image=secure_url;
        req.body.ImagePublicId=public_id;
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name);
    }
    const category = await categoryModel.findByIdAndUpdate(id,req.body,{new:false});

    if(req.file){
     await cloudinary.uploader.destroy(category.ImagePublicId);   
    }
    if(category){
        res.status(200).json({message:"success",category});
    }else{
        res.status(400).json({message:"fail update category"})
    }
}

export const allCategory = async(req,res,next)=>{
    const {page,size} = req.query;
    const {limit,skip}=pagination(page,size);
    
    const allCategory = await categoryModel.find({}).limit(limit).skip(skip).populate([
        { // this populate is to show what is the name of the user create this category
            path:'createdBy',
            select:'-_id userName'
        },
        {
            path:'subCategory'
        }
    ]);
    if(allCategory){
        res.status(200).json({message:"success",allCategory});
    }else{
        res.status(400).json({message:"fail"});
    }
}
export const getCat=async(req,res,next)=>{
    const {id} = req.params;
    const category = await categoryModel.findOne({_id:id}).populate({
        path:"createdBy",
        select:"userName"
    });
    if(category){
        res.status(200).json({message:"success",category});
    }else{
        res.status(400).json({message:"fail"});
    }
}

