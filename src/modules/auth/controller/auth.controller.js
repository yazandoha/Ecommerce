import jwt from "jsonwebtoken";
import userModel from "../../../../DB/model/user.model.js";
import bcrypt from "bcrypt";
export const signin = async (req,res)=>{
    try{
        const {email ,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({message:"error :email not exist"});
        }
        else{
            const pass= await bcrypt.compare(password,user.password);
            res.status(200).json({message:"store email",pass});

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
            const link=`${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail/${token}`; //http://localhost:3000/api/v1/auth/signup
            const message=`
                <a href="${link}">Confirm Email</a>
            `;
            res.status(200).json({message:"signup true",token,link});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err});
    }
}