import { Router } from "express";
import * as userFunctions from "./controller/user.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./user.endpoint.js";

const router = Router();

router.get('/profile',auth(endPoint.profile),userFunctions.profile);
export default router;
