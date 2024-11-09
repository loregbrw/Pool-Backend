"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const CardSchema_schemas_1 = __importDefault(require("../schemas/CardSchema.schemas"));
const CardsController_controller_1 = __importDefault(require("../controllers/CardsController.controller"));
const cardsRouter = (0, express_1.Router)();
cardsRouter.get("/:id", ValidateMiddleware_middleware_1.default.validadeToken, CardsController_controller_1.default.getById);
cardsRouter.get("/sprint/:sprintId", ValidateMiddleware_middleware_1.default.validadeToken, CardsController_controller_1.default.getBySprintId);
cardsRouter.patch("/:id", ValidateMiddleware_middleware_1.default.validadeBody(CardSchema_schemas_1.default.update), ValidateMiddleware_middleware_1.default.validadeToken, CardsController_controller_1.default.update);
cardsRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(CardSchema_schemas_1.default.creation), ValidateMiddleware_middleware_1.default.validadeToken, CardsController_controller_1.default.create);
exports.default = cardsRouter;
