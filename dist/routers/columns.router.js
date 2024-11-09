"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const ColumnSchemas_1 = __importDefault(require("../schemas/ColumnSchemas"));
const ColumnsController_1 = __importDefault(require("../controllers/ColumnsController"));
const columnsRouter = (0, express_1.Router)();
columnsRouter.patch("/:id", Validate_middleware_1.default.validadeBody(ColumnSchemas_1.default.update), Validate_middleware_1.default.validadeToken, ColumnsController_1.default.update);
columnsRouter.post("/", Validate_middleware_1.default.validadeBody(ColumnSchemas_1.default.creation), Validate_middleware_1.default.validadeToken, ColumnsController_1.default.create);
exports.default = columnsRouter;
