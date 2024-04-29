import { Router } from "express";
import { endPoint } from "./category.endpoint.js";
import * as categoryFunctions from "./controller/category.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import subcategoryRouter  from "../subCategory/subcategory.router.js";
const router=Router();

//sub category router
router.use('/:categoryId',subcategoryRouter);
router.post('/createCategory',auth(endPoint.add),myMulter(fileValidation.image).single('image'),asyncHandler(categoryFunctions.createCategory));
router.put('/:id',auth(endPoint.update),myMulter(fileValidation.image).single('image'),asyncHandler(categoryFunctions.updateCategory));
router.get('/all',asyncHandler(categoryFunctions.allCategory));
router.get('/:id',asyncHandler(categoryFunctions.getCat));


export default router;
