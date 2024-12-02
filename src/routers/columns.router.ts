import { Router } from "express";
import Validate from "../middlewares/Validate.middleware";
import ColumnSchema from "../schemas/ColumnSchemas";
import ColumnsController from "../controllers/ColumnsController";

const columnsRouter: Router = Router();

columnsRouter.get("/sprint/:sprintId", Validate.validadeToken, ColumnsController.getBySprint);
columnsRouter.patch("/:id", Validate.validadeBody(ColumnSchema.update), Validate.validadeToken, ColumnsController.update);
columnsRouter.post("/", Validate.validadeBody(ColumnSchema.creation), Validate.validadeToken, ColumnsController.create);

export default columnsRouter;