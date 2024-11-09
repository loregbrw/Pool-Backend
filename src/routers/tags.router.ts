import { Router } from "express";

import TagsController from "../controllers/TagsController";
import Validate from "../middlewares/Validate.middleware";
import TagSchemas from "../schemas/TagSchemas";

const tagsRouter = Router();

tagsRouter.get("/", Validate.validadeToken, TagsController.getByUser);
tagsRouter.post("/", Validate.validadeBody(TagSchemas.creation), Validate.validadeToken, TagsController.create);
tagsRouter.patch("/:id", Validate.validadeBody(TagSchemas.update), Validate.validadeToken, TagsController.update);
tagsRouter.delete("/:id", Validate.validadeToken, TagsController.delete);

export default tagsRouter;