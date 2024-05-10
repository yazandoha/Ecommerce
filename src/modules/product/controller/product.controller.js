import slugify from "slugify";
import cloudinary from "../../../services/cloudinary.js";
import {pagination} from "../../../services/pagination.js"
import productModel from "../../../../DB/model/product.model.js";
import subcategoryModel from "../../../../DB/model/subcategory.model.js";
import brandModel from "../../../../DB/model/brand.model.js";

export const createProduct = async(req,res,next)=>{
    if(!req.files?.length){ // this mean >> if the req.files is exist then check the length
        res.status(400).json({message:"error:image is required"});
    }
    else{
        // in this case you must check the value that must can't be null
        const {name,amount,price,discount,categoryId,subcategoryId,brandId}= req.body;
        if(name && categoryId && subcategoryId && brandId){
            req.body.slug =slugify(name); 
            req.body.stock=amount;
            if(price && discount){
                req.body.finalPrice=(price -(price *((discount || 0)/100))); // this (discount || 0) means if the discount is empty then set it zero
            }
            const category = await subcategoryModel.findOne({_id:subcategoryId,categoryId});
            if(!category){
                res.status(400).json({message:"invalid category or sub category id"});
            }
            const brand = await brandModel.findOne({_id:brandId});
            if(!brand){
                res.status(400).json({message:"invalid brand"});
            }
            const images = [];
            const ImagePublicIds =[];
            for (const file of req.files) {
                let {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`ecommerce/product/${name}`});
                images.push(secure_url);
                ImagePublicIds.push(public_id);
            }
            req.body.images=images;
            req.body.ImagePublicIds = ImagePublicIds;
            req.body.createdBy = req.user._id;
            const product = await productModel.create(req.body);
            if(!product){
                res.status(400).json({message:"error store product"});
            }else{
                res.status(200).json({message:"success",product});
            }
        }
        else{
            res.status(400).json({message:"error some data must be required"});
        }
    }
}
export const updateProduct = async(req,res,next)=>{
    const {id}=req.params;
    const {name,amount,price,discount,categoryId,subcategoryId,brandId}=req.body;
    const product = await productModel.findById(id);
    if(!product){
        res.json({message:{message:"product not found"}});
    }
    if(name){
        req.body.slug=slugify(name);
    }
    if(amount){
        let stok=amount-product.soldItems;
        if(stok>0){
            req.body.stock=stok;
        }else{
            req.body.stock=0;
        }
    }
    if(price && discount){
        req.body.finalPrice=(price -(price *((discount)/100)));
    }else if(price){
        req.body.finalPrice=(price -(price *((product.discount)/100)));
    }else if(discount){
        req.body.finalPrice=(product.price -(product.price *((discount)/100)));
    }
    if(categoryId && subcategoryId){
        const category= await subcategoryModel.findOne({_id:subcategoryId,categoryId});
        if(!category){
            res.status(404).json({message:"invalid category or sub category ID"});
        }
    }
    if(brandId){
        const brand = await brandModel.findById(brandId);
        if(!brand){
            res.status(404).json({message:"invalid brand ID"});
        }
    }

    if(req.files?.length){ // this mean >> if the req.files is exist then check the length
        const images = [];
        const ImagePublicIds =[];
        for (const file of req.files) {

            let {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`ecommerce/product/${product.name}`});
            images.push(secure_url);
            ImagePublicIds.push(public_id);
        }
        req.body.images=images;
        req.body.ImagePublicIds = ImagePublicIds;
    }

    const updateProd = await productModel.findOneAndUpdate({_id:id},req.body,{new:false});
    if(updateProd){
        if(req.files?.length){
            for (const imgId of product.ImagePublicIds) {
                await cloudinary.uploader.destroy(imgId);
            }
            res.status(200).json({message:" update product",updateProd});
        }
    }else{
        res.status(404).json({message:"invalid update product"});
    }

}
export const allProduct = async(req,res,next)=>{
    const {page,size} = req.query;
    const {limit,skip}=pagination(page,size);
    
    const allProduct = await productModel.find({}).select('-_id').limit(limit).skip(skip).populate({ // this populate is to show what is the name of the user create this category
        path:"createdBy",
        select:"-_id name"
    });
    if(allProduct){
        res.status(200).json({message:"success",allProduct});
    }else{
        res.status(400).json({message:"fail"});
    }
}
export const getProduct=async(req,res,next)=>{
    const {id} = req.params;
    const product = await productModel.findOne({_id:id}).populate({
        path:"createdBy",
        select:"name"
    });
    if(product){
        res.status(200).json({message:"success",product});
    }else{
        res.status(400).json({message:"fail"});
    }
}

