import { Router } from "express";
import Validate from "../middlewares/Validate.middleware";
import CardSchemas from "../schemas/CardSchemas";
import CardsController from "../controllers/CardsController";

const cardsRouter: Router = Router();

cardsRouter.get("/:id", Validate.validadeToken, CardsController.getById);
cardsRouter.get("/column/:columnId", Validate.validadeToken, CardsController.getByColumnId);
cardsRouter.get("/sprint/:sprintId", Validate.validadeToken, CardsController.getBySprintId);
cardsRouter.patch("/:id", Validate.validadeBody(CardSchemas.update), Validate.validadeToken, CardsController.update);
cardsRouter.patch("/move/:id", Validate.validadeBody(CardSchemas.move), Validate.validadeToken, CardsController.moveCard);
cardsRouter.post("/", Validate.validadeBody(CardSchemas.creation), Validate.validadeToken, CardsController.create);

export default cardsRouter;