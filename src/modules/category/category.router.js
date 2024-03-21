import { Router } from "express";
import { endPoint } from "./category.endpoint.js";
import * as categoryFunctions from "./controller/category.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router();

router.post('/createCategory',auth(endPoint.add),myMulter(fileValidation.image).single('image'),asyncHandler(categoryFunctions.createCategory));
// router.post('/createCategory',auth(endPoint.add),myMulter(fileValidation.image).single('image'),categoryFunctions.createCategory);

// router.post('/add',categoryFunctions.add);

export default router;
