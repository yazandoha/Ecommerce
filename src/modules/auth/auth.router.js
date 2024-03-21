import { Router } from "express";
import * as authFunctions from "./controller/auth.controller.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./auth.validation.js";

const router = Router();
router.get('/signin',asyncHandler(authFunctions.signin));
router.post('/signup',validation(validators.signup),authFunctions.signup);
router.get('/confirmEmail/:token',authFunctions.confirmEmail);
router.get('/isConfirmed',authFunctions.successConfirmEmail);
export default router;