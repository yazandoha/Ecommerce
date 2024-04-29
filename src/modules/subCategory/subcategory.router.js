import { Router } from "express";
import { endPoint } from "./subcategory.endpoint.js";
import * as subcategoryFunctions from "./controller/subcategory.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router({mergeParams:true}); // this mergeParams is to allaw acess to params in the out Router

// router.get('',asyncHandler(subcategoryFunctions.getCat1));
router.post('/createSubCategory',auth(endPoint.add),myMulter(fileValidation.image).single('image'),asyncHandler(subcategoryFunctions.createSubCategory));
router.put('/update/:id',auth(endPoint.update),myMulter(fileValidation.image).single('image'),asyncHandler(subcategoryFunctions.updateSubCategory));
router.get('/allsub',asyncHandler(subcategoryFunctions.allSubCategory));
router.get('/sub/:id',asyncHandler(subcategoryFunctions.getSubCat));
export default router;
