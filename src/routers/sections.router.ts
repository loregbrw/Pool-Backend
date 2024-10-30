import { Router } from "express";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import SectionSchema from "../schemas/SectionSchema.schemas";
import SectionsController from "../controllers/SectionsController";

const sectionsRouter: Router = Router();

sectionsRouter.post("/", ValidateMiddleware.validadeBody(SectionSchema.creation), ValidateMiddleware.validadeToken, SectionsController.create);

export default sectionsRouter;