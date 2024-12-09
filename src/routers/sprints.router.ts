import { Router } from "express";
import Validate from "../middlewares/Validate.middleware";
import SprintSchema from "../schemas/SprintSchemas";
import SprintsController from "../controllers/SprintsController";

const sprintsRouter = Router();

sprintsRouter.get("/:id", Validate.validadeToken, SprintsController.getById);
sprintsRouter.get("/project/:projectId", Validate.validadeToken, SprintsController.getByProjectId);
sprintsRouter.post("/", Validate.validadeBody(SprintSchema.creation), Validate.validadeToken, SprintsController.create);
sprintsRouter.patch("/:id", Validate.validadeBody(SprintSchema.update), Validate.validadeToken, SprintsController.update);
sprintsRouter.patch("/reorder/:id", Validate.validadeBody(SprintSchema.reorder), Validate.validadeToken, SprintsController.reorderColumns);

export default sprintsRouter;