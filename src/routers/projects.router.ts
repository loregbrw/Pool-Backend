import { Router } from "express";
import ProjectsController from "../controllers/ProjectsController";
import Validate from "../middlewares/Validate.middleware";
import ProjectSchema from "../schemas/ProjectSchemas";

const projectsRouter = Router();

projectsRouter.get("/", Validate.validadeToken, ProjectsController.get);
projectsRouter.get("/:id", Validate.validadeToken, ProjectsController.getById);
projectsRouter.post("/", Validate.validadeBody(ProjectSchema.creation), Validate.validadeToken, ProjectsController.create);

export default projectsRouter;