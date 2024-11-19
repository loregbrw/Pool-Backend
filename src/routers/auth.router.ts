import { Router } from "express";
import UsersController from "../controllers/UsersController";
import Validate from "../middlewares/Validate.middleware";
import UserSchema from "../schemas/UserSchemas";

const authRouter: Router = Router();

authRouter.post("/",Validate.validadeBody(UserSchema.login), UsersController.login);

export default authRouter;