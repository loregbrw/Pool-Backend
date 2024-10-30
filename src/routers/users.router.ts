import { Router } from "express";
import UsersController from "../controllers/UsersConstroller.controller";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import UserSchema from "../schemas/UserSchemas.schemas";

const usersRouter: Router = Router();

usersRouter.post("/", ValidateMiddleware.validadeBody(UserSchema.creation), UsersController.create);
usersRouter.patch("/:id", ValidateMiddleware.validadeBody(UserSchema.update), ValidateMiddleware.validadeToken, UsersController.update);
usersRouter.delete("/", ValidateMiddleware.validadeToken, UsersController.delete);
usersRouter.get("/", ValidateMiddleware.validadeToken, UsersController.get);
usersRouter.get("/pag", ValidateMiddleware.validadeToken, UsersController.getPagination);

export default usersRouter;