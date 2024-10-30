import { Router } from "express";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import SprintSchema from "../schemas/SprintSchemas.schemas";
import SprintsController from "../controllers/SprintsController";

const sprintsRouter = Router();

sprintsRouter.get("/:id", ValidateMiddleware.validadeToken, SprintsController.getById);
sprintsRouter.post("/", ValidateMiddleware.validadeBody(SprintSchema.creation), ValidateMiddleware.validadeToken, SprintsController.create);
sprintsRouter.patch("/:id", ValidateMiddleware.validadeBody(SprintSchema.update), ValidateMiddleware.validadeToken, SprintsController.update);

export default sprintsRouter;