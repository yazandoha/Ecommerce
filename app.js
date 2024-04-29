//npm run dev
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connection.js';
import * as indexRouter from './src/modules/index.router.js';
import { globalErrorHandling } from './src/middleware/asyncHandling.js';
import morgan from 'morgan';

dotenv.config({path:'./config/.env'});
const port = process.env.PORT;
const app = express();
app.use(express.json());
if(process.env.MOOD=='DEV'){ // review :this morgan to help development to know details for requist
    app.use(morgan('dev'));
}
connectDB();
const baseUrl = process.env.BASEURL;
app.use(`${baseUrl}auth`,indexRouter.authRouter);
app.use(`${baseUrl}user`,indexRouter.userRouter);
app.use(`${baseUrl}category`,indexRouter.categoryRouter);
app.use(`${baseUrl}sub-category`,indexRouter.subcategoryRouter);
app.use('*',(req,res)=>{
    res.json({message:"page not found"});
});

//global error handling middleware
app.use(globalErrorHandling); 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))