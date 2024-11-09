import { Router } from "express";
import Validate from "../middlewares/Validate.middleware";
import SectionSchema from "../schemas/SectionSchema";
import SectionsController from "../controllers/SectionsController";

const sectionsRouter: Router = Router();

sectionsRouter.post("/", Validate.validadeBody(SectionSchema.creation), Validate.validadeToken, SectionsController.create);

export default sectionsRouter;