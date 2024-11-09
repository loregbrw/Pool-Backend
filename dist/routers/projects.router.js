"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectsController_1 = __importDefault(require("../controllers/ProjectsController"));
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const ProjectSchemas_1 = __importDefault(require("../schemas/ProjectSchemas"));
const projectsRouter = (0, express_1.Router)();
projectsRouter.get("/", Validate_middleware_1.default.validadeToken, ProjectsController_1.default.get);
projectsRouter.get("/:id", Validate_middleware_1.default.validadeToken, ProjectsController_1.default.getById);
projectsRouter.post("/", Validate_middleware_1.default.validadeBody(ProjectSchemas_1.default.creation), Validate_middleware_1.default.validadeToken, ProjectsController_1.default.create);
exports.default = projectsRouter;
