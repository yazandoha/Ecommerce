//npm run dev
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connection.js';
import * as indexRouter from './src/modules/index.router.js';

dotenv.config({path:'./config/.env'});
const port = process.env.PORT;
const app = express();
app.use(express.json());
connectDB();
const baseUrl = process.env.BASEURL;
app.use(`${baseUrl}auth`,indexRouter.authRouter);
app.use(`${baseUrl}user`,indexRouter.userRouter);
app.use('*',(req,res)=>{
    res.json({message:"page not found"});
});
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))