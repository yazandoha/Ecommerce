import { Router } from "express";
import * as authFunctions from "./controller/auth.controller.js";

const router = Router();
router.get('/signin',authFunctions.signin);
router.post('/signup',authFunctions.signup);
router.get('/confirmEmail/:token',authFunctions.confirmEmail);
export default router;