"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const SectionSchema_schemas_1 = __importDefault(require("../schemas/SectionSchema.schemas"));
const SectionsController_1 = __importDefault(require("../controllers/SectionsController"));
const sectionsRouter = (0, express_1.Router)();
sectionsRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(SectionSchema_schemas_1.default.creation), ValidateMiddleware_middleware_1.default.validadeToken, SectionsController_1.default.create);
exports.default = sectionsRouter;