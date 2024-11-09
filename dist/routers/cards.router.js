"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const CardSchemas_1 = __importDefault(require("../schemas/CardSchemas"));
const CardsController_1 = __importDefault(require("../controllers/CardsController"));
const cardsRouter = (0, express_1.Router)();
cardsRouter.get("/:id", Validate_middleware_1.default.validadeToken, CardsController_1.default.getById);
cardsRouter.get("/sprint/:sprintId", Validate_middleware_1.default.validadeToken, CardsController_1.default.getBySprintId);
cardsRouter.patch("/:id", Validate_middleware_1.default.validadeBody(CardSchemas_1.default.update), Validate_middleware_1.default.validadeToken, CardsController_1.default.update);
cardsRouter.post("/", Validate_middleware_1.default.validadeBody(CardSchemas_1.default.creation), Validate_middleware_1.default.validadeToken, CardsController_1.default.create);
exports.default = cardsRouter;
