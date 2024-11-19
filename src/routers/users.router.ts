import UserSchema from "../schemas/UserSchemas";
import Validate from "../middlewares/Validate.middleware";
import UsersController from "../controllers/UsersController";

import { Router } from "express";

const usersRouter: Router = Router();

usersRouter.post("/", Validate.validadeBody(UserSchema.creation), UsersController.create);
usersRouter.patch("/:id", Validate.validadeBody(UserSchema.update), Validate.validadeToken, UsersController.update);
usersRouter.delete("/", Validate.validadeToken, UsersController.delete);
usersRouter.get("/", Validate.validadeToken, UsersController.get);
usersRouter.get("/exists/:str", UsersController.exists);
usersRouter.get("/pag", Validate.validadeToken, UsersController.getPagination);

export default usersRouter;