import mongoose from "mongoose";

const connectDB= async()=>{
    return await mongoose.connect(process.env.DBURL)
    .then(res =>{
        console.log("connected DB");
    }).catch(err=>{
        console.log("error connect:",err);
    });
}
export default connectDB;