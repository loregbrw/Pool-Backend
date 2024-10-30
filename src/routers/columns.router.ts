import { Router } from "express";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.middleware";
import ColumnSchema from "../schemas/ColumnSchemas.schemas";
import ColumnsController from "../controllers/ColumnsController.controller";

const columnsRouter: Router = Router();

columnsRouter.patch("/:id", ValidateMiddleware.validadeBody(ColumnSchema.update), ValidateMiddleware.validadeToken, ColumnsController.update);
columnsRouter.post("/", ValidateMiddleware.validadeBody(ColumnSchema.creation), ValidateMiddleware.validadeToken, ColumnsController.create);

export default columnsRouter;