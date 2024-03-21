
import multer from 'multer';

export const fileValidation = {
    image:['image/png','image/jpeg'],
    pdf:['application/pdf'],
}
export const HME =(err,req,res,next)=>{
    if(err){
        res.status(400).json({message:"multer error"});
    }else{
        next();
    }
}
export function myMulter(customValidation){ //customValidation is the type of the files or picture that allow to pass
    const storage = multer.diskStorage({}); // storage is empty becouse the image store in cloudinery(online)
    function fileFilter (req, file, cb){
        if(!customValidation.includes(file.mimetype)){
            cb("invalid format", false);
        }else{
            cb(null,true);
        }
      }
    const upload = multer({fileFilter,storage});
    return upload;
}
  