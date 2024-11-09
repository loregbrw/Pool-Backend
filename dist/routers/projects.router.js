"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectsController_controller_1 = __importDefault(require("../controllers/ProjectsController.controller"));
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const ProjectSchemas_schemas_1 = __importDefault(require("../schemas/ProjectSchemas.schemas"));
const projectsRouter = (0, express_1.Router)();
projectsRouter.get("/", ValidateMiddleware_middleware_1.default.validadeToken, ProjectsController_controller_1.default.get);
projectsRouter.get("/:id", ValidateMiddleware_middleware_1.default.validadeToken, ProjectsController_controller_1.default.getById);
projectsRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(ProjectSchemas_schemas_1.default.creation), ValidateMiddleware_middleware_1.default.validadeToken, ProjectsController_controller_1.default.create);
exports.default = projectsRouter;
