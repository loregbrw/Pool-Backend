"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const ColumnSchemas_schemas_1 = __importDefault(require("../schemas/ColumnSchemas.schemas"));
const ColumnsController_controller_1 = __importDefault(require("../controllers/ColumnsController.controller"));
const columnsRouter = (0, express_1.Router)();
columnsRouter.patch("/:id", ValidateMiddleware_middleware_1.default.validadeBody(ColumnSchemas_schemas_1.default.update), ValidateMiddleware_middleware_1.default.validadeToken, ColumnsController_controller_1.default.update);
columnsRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(ColumnSchemas_schemas_1.default.creation), ValidateMiddleware_middleware_1.default.validadeToken, ColumnsController_controller_1.default.create);
exports.default = columnsRouter;
