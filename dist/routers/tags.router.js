"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TagsController_controller_1 = __importDefault(require("../controllers/TagsController.controller"));
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const TagSchemas_schemas_1 = __importDefault(require("../schemas/TagSchemas.schemas"));
const tagsRouter = (0, express_1.Router)();
tagsRouter.get("/", ValidateMiddleware_middleware_1.default.validadeToken, TagsController_controller_1.default.getByUser);
tagsRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(TagSchemas_schemas_1.default.creation), ValidateMiddleware_middleware_1.default.validadeToken, TagsController_controller_1.default.create);
tagsRouter.patch("/:id", ValidateMiddleware_middleware_1.default.validadeBody(TagSchemas_schemas_1.default.update), ValidateMiddleware_middleware_1.default.validadeToken, TagsController_controller_1.default.update);
tagsRouter.delete("/:id", ValidateMiddleware_middleware_1.default.validadeToken, TagsController_controller_1.default.delete);
exports.default = tagsRouter;
