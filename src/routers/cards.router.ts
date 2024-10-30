import { Router } from "express";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import CardSchema from "../schemas/CardSchema.schemas";
import CardsController from "../controllers/CardsController.controller";

const cardsRouter: Router = Router();

cardsRouter.get("/:id", ValidateMiddleware.validadeToken, CardsController.getById);
cardsRouter.get("/sprint/:sprintId", ValidateMiddleware.validadeToken, CardsController.getBySprintId);
cardsRouter.patch("/:id", ValidateMiddleware.validadeBody(CardSchema.update), ValidateMiddleware.validadeToken, CardsController.update);
cardsRouter.post("/", ValidateMiddleware.validadeBody(CardSchema.creation), ValidateMiddleware.validadeToken, CardsController.create);

export default cardsRouter;