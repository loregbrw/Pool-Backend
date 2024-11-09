"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../errors"));
const CardService_1 = __importDefault(require("../services/CardService"));
class CardsController {
}
_a = CardsController;
CardsController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    // verify if there is access
    const card = yield CardService_1.default.create(req.body);
    return res.status(201).json({ card });
});
CardsController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    // verify if there is access
    const card = yield CardService_1.default.update(req.params.id, req.body, userSession.id);
    return res.status(201).json({ card });
});
CardsController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    // verify if there is access
    const card = yield CardService_1.default.getById(req.params.id);
    return res.status(201).json({ card });
});
CardsController.getBySprintId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    // verify if there is access
    const cards = yield CardService_1.default.getBySprintId(req.params.sprintId);
    return res.status(201).json({ cards });
});
exports.default = CardsController;
