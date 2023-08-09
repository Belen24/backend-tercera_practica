import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { checkUserAuthenticatedView, checkRoles} from "../middlewares/auth.js";


const router = Router();


router.get("/", UserController.get);
router.put("/premium/:uid", checkUserAuthenticatedView, checkRoles(["admin"]), UserController.modifyRole )

export {router as userRouter};