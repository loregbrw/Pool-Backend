"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const SprintSchemas_schemas_1 = __importDefault(require("../schemas/SprintSchemas.schemas"));
const SprintsController_1 = __importDefault(require("../controllers/SprintsController"));
const sprintsRouter = (0, express_1.Router)();
sprintsRouter.get("/:id", ValidateMiddleware_middleware_1.default.validadeToken, SprintsController_1.default.getById);
sprintsRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(SprintSchemas_schemas_1.default.creation), ValidateMiddleware_middleware_1.default.validadeToken, SprintsController_1.default.create);
sprintsRouter.patch("/:id", ValidateMiddleware_middleware_1.default.validadeBody(SprintSchemas_schemas_1.default.update), ValidateMiddleware_middleware_1.default.validadeToken, SprintsController_1.default.update);
exports.default = sprintsRouter;
