export const asyncHandler=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(error=>{
            return res.json({message:"catch error",err:error.message,stack:error.stack});
        })
    }
}
export const globalErrorHandling =(err,req,res,next)=>{
    if(err){
        return res.status(err['cause']).json({message:err.message});
    }
}