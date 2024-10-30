import { Router } from "express";
import ProjectsController from "../controllers/ProjectsController.controller";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import ProjectSchema from "../schemas/ProjectSchemas.schemas";

const projectsRouter = Router();

projectsRouter.get("/", ValidateMiddleware.validadeToken, ProjectsController.get);
projectsRouter.get("/:id", ValidateMiddleware.validadeToken, ProjectsController.getById);
projectsRouter.post("/", ValidateMiddleware.validadeBody(ProjectSchema.creation), ValidateMiddleware.validadeToken, ProjectsController.create);

export default projectsRouter;