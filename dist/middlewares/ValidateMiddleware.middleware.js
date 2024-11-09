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
const UserSession_1 = __importDefault(require("../sessions/UserSession"));
const AuthService_service_1 = __importDefault(require("../services/AuthService.service"));
class ValidateMiddleware {
}
_a = ValidateMiddleware;
ValidateMiddleware.validadeBody = (schema) => (req, res, next) => {
    const validated = schema.parse(req.body);
    req.body = validated;
    return next();
};
ValidateMiddleware.validadeToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth)
        throw new errors_1.default("Missing baerer token!", 401);
    const [_baerer, token] = auth.split(" ");
    const userId = yield AuthService_service_1.default.verifyToken(token);
    if (!userId)
        throw new errors_1.default("Invalid token!", 401);
    const userSession = new UserSession_1.default(userId);
    req.userSession = userSession;
    next();
});
exports.default = ValidateMiddleware;
