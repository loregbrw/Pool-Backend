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
const SprintService_service_1 = __importDefault(require("../services/SprintService.service"));
class SprintsController {
}
_a = SprintsController;
SprintsController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    const sprint = yield SprintService_service_1.default.create(req.body, userSession.id);
    return res.status(201).json({ sprint });
});
SprintsController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    const sprint = yield SprintService_service_1.default.update(req.params.id, req.body, userSession.id);
    return res.status(201).json({ sprint });
});
// public static get = async (req: Request, res: Response) => {
//     const userSession = (req as any).userSession;
//     if (!userSession)
//         throw new AppError("Unathorized!", 401);
//     const projects = await ProjectService.getByUser(userSession.id);
//     return res.status(200).json({ projects });
// }
SprintsController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    const sprint = yield SprintService_service_1.default.getById(req.params.id);
    return res.status(200).json({ sprint });
});
exports.default = SprintsController;
