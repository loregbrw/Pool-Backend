"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TagsController_1 = __importDefault(require("../controllers/TagsController"));
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const TagSchemas_1 = __importDefault(require("../schemas/TagSchemas"));
const tagsRouter = (0, express_1.Router)();
tagsRouter.get("/", Validate_middleware_1.default.validadeToken, TagsController_1.default.getByUser);
tagsRouter.post("/", Validate_middleware_1.default.validadeBody(TagSchemas_1.default.creation), Validate_middleware_1.default.validadeToken, TagsController_1.default.create);
tagsRouter.patch("/:id", Validate_middleware_1.default.validadeBody(TagSchemas_1.default.update), Validate_middleware_1.default.validadeToken, TagsController_1.default.update);
tagsRouter.delete("/:id", Validate_middleware_1.default.validadeToken, TagsController_1.default.delete);
exports.default = tagsRouter;
