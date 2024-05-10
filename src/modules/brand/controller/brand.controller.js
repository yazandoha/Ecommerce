import slugify from "slugify";
import cloudinary from "../../../services/cloudinary.js";
import {pagination} from "../../../services/pagination.js"
import brandModel from "../../../../DB/model/brand.model.js";

export const createBrand = async(req,res,next)=>{
        if(req.file){
            const {name}=req.body;
            if(name){
                    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/brand`});
                    const slug = slugify(name); //write the name "yazan doha" as this type "yazan-doha"
                    const brand = await brandModel.create({image:secure_url,name,ImagePublicId:public_id,slug,createdBy:req.user._id});
                    if(brand){
                        res.status(200).json({message:"sccess add sub brand",brand});
                    }else{
                        res.status(400).json({message:"fail add brand"})
                    }
            }else{
                res.status(401).json({message:"name must be not null"});
            }
        }else{
            res.status(400).json({message:"image is require"});
        }
}
export const updateBrand = async(req,res,next)=>{
    const {id}=req.params;
    // thear is a step not found( check by id if the brand is exist or not befor and work)
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/brand`});
        req.body.image=secure_url;
        req.body.ImagePublicId=public_id;
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name);
    }
    const brand = await brandModel.findOneAndUpdate({_id:id},req.body,{new:false});

    if(req.file){
     await cloudinary.uploader.destroy(brand.ImagePublicId);   
    }
    if(brand){
        res.status(200).json({message:"success",brand});
    }else{
        res.status(400).json({message:"fail update brand"});
    }
}
export const allBrand = async(req,res,next)=>{
    const {page,size} = req.query;
    const {limit,skip}=pagination(page,size);
    
    const allBrand = await brandModel.find({}).select('-_id').limit(limit).skip(skip).populate({ // this populate is to show what is the name of the user create this category
        path:"createdBy",
        select:"-_id userName"
    });
    if(allBrand){
        res.status(200).json({message:"success",allBrand});
    }else{
        res.status(400).json({message:"fail"});
    }
}
export const getBrand=async(req,res,next)=>{
    const {id} = req.params;
    const brand = await brandModel.findOne({_id:id}).populate({
        path:"createdBy",
        select:"userName"
    });
    if(brand){
        res.status(200).json({message:"success",brand});
    }else{
        res.status(400).json({message:"fail"});
    }
}

