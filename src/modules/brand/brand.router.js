import { Router } from "express";
import { endPoint } from "./brand.endpoint.js";
import * as brandFunctions from "./controller/brand.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router(); // this mergeParams is to allaw acess to params in the out Router

router.post('/createBrand',auth(endPoint.add),myMulter(fileValidation.image).single('image'),asyncHandler(brandFunctions.createBrand));
router.put('/update/:id',auth(endPoint.update),myMulter(fileValidation.image).single('image'),asyncHandler(brandFunctions.updateBrand));
router.get('/allBrand',asyncHandler(brandFunctions.allBrand));
router.get('/:id',asyncHandler(brandFunctions.getBrand));
export default router;
