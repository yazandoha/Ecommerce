import jwt from "jsonwebtoken";
import userModel from "../../../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../services/email.js";
export const signin = async (req,res,next)=>{
    try{
        const {email ,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return next(new Error("email not exist",{cause:400}));
            // res.status(400).json({message:"error :email not exist"});
        }
        else{
            if(user.confirmEmail){
                if(user.blocked){
                    res.status(400).json({message:"blocked acount"});
                }else{
                    const pass= await bcrypt.compare(password,user.password);
                    if(pass){
                         // password is true create token and send to frontend
                        const token =jwt.sign({id:user._id},process.env.LOGINTOKEN,{expiresIn:60*60*24});
                        res.status(200).json({message:"success login",token});
                    }else{
                        res.status(400).json({message:"error password"});
                   }
                }
            }else{
                res.status(401).json({message:"error: must confirm email"});
            }
        }
    }catch(err){
        res.status(500).json({message:"catch error :",err});
    }
}

export const signup = async (req,res)=>{
    try{
        const{userName,email,password}=req.body;
        const user =await userModel.findOne({email}).select('email');
        if(user){
            res.status(409).json({message:"email exist"});
        }else{
            const hashPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
            // const store = await userModel.create({userName,email,password:hashPassword});//this store the data in the DB at the same time when the process do this line
            // but you need to store the object in DB after send the message confirm to email >> use ..
            const store = new userModel({userName,email,password:hashPassword}); // create a object but not store in DB
            const token = jwt.sign({id:store._id},process.env.EMAILTOKEN,{expiresIn:'1h'});
            const link=`${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail/${token}`; //http://localhost:3000/api/v1/auth/confirmEmail/token
            const message=`
                <a href="${link}">Confirm Email</a>
            `;
            const info =await sendEmail(email,"confirm email",message);
            // console.log(info);
            if(info.accepted){
                const saved= await store.save();
                res.status(201).json({message:"success",saved});
            }
            else{
                res.status(400).json({message:"email rejected"});
            }
        }
    }catch(err){
        res.status(500).json({message:"catch error",err});
    }
}

export const confirmEmail = async(req,res)=>{
    try{
        const {token}=req.params;
        const decoded = jwt.verify(token,process.env.EMAILTOKEN);
        if(decoded.id){
            const user= await userModel.findByIdAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true});
            if(user){
                res.status(200).redirect(process.env.FEURL);
                // res.status(201).json({message:"success confirmEmail"});
            }
            else{
                res.status(401).json({message:"error confirmEmail"});
            }
        }else{
            res.status(400).json({message:"error token"});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err})
    }

}
export const successConfirmEmail = async(req,res)=>{
    res.status(200).json({message:"the email is confirmed"});
}