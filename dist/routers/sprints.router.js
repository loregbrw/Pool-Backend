"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const SprintSchemas_1 = __importDefault(require("../schemas/SprintSchemas"));
const SprintsController_1 = __importDefault(require("../controllers/SprintsController"));
const sprintsRouter = (0, express_1.Router)();
sprintsRouter.get("/:id", Validate_middleware_1.default.validadeToken, SprintsController_1.default.getById);
sprintsRouter.post("/", Validate_middleware_1.default.validadeBody(SprintSchemas_1.default.creation), Validate_middleware_1.default.validadeToken, SprintsController_1.default.create);
sprintsRouter.patch("/:id", Validate_middleware_1.default.validadeBody(SprintSchemas_1.default.update), Validate_middleware_1.default.validadeToken, SprintsController_1.default.update);
exports.default = sprintsRouter;
