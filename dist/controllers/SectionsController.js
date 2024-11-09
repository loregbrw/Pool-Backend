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
const SectionService_service_1 = __importDefault(require("../services/SectionService.service"));
class SectionsController {
}
_a = SectionsController;
SectionsController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    // verify if there is access
    const section = yield SectionService_service_1.default.create(req.body);
    return res.status(201).json({ card: section });
});
exports.default = SectionsController;
