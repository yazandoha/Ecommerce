import { Router } from "express";
import { endPoint } from "./product.endpoint.js";
import * as productFunctions from "./controller/product.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router(); // this mergeParams is to allaw acess to params in the out Router

router.post('/createProduct',auth(endPoint.add),myMulter(fileValidation.image).array('image',5),asyncHandler(productFunctions.createProduct));
router.put('/update/:id',auth(endPoint.update),myMulter(fileValidation.image).array('image',5),asyncHandler(productFunctions.updateProduct));
router.get('/allProduct',asyncHandler(productFunctions.allProduct));
router.get('/:id',asyncHandler(productFunctions.getProduct));

export default router;
