import { Router } from "express";
import * as userFunctions from "./controller/user.controller.js";
const router = Router();

router.get('/userFun',userFunctions.function1);
export default router;
