const dataMethod=['body','params','query','headers'];
export const validation =(schema)=>{
    return(req,res,next)=>{
        try{
            const validationArr=[];
            dataMethod.forEach((key)=>{
                if(schema[key]){
                    const validationResult = schema[key].validate(req[key],{abortEarly:false});
                    if(validationResult.error){
                        validationArr.push(validationResult.error.details);
                    }else{
                        next();
                    }
                }
            })
            if(validationArr.length){
                return res.status(400).json({messaege:"validation error",validationArr});
            }
        }catch(err){
            res.status(500).json({message:"catch error",err});
        }
    }
}