import { Router } from "express";

import TagsController from "../controllers/TagsController.controller";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import TagSchemas from "../schemas/TagSchemas.schemas";

const tagsRouter = Router();

tagsRouter.get("/", ValidateMiddleware.validadeToken, TagsController.getByUser);
tagsRouter.post("/", ValidateMiddleware.validadeBody(TagSchemas.creation), ValidateMiddleware.validadeToken, TagsController.create);
tagsRouter.patch("/:id", ValidateMiddleware.validadeBody(TagSchemas.update), ValidateMiddleware.validadeToken, TagsController.update);
tagsRouter.delete("/:id", ValidateMiddleware.validadeToken, TagsController.delete);

export default tagsRouter;