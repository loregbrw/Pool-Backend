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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const errors_1 = __importDefault(require("../errors"));
class UsersController {
}
_a = UsersController;
UsersController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield AuthService_1.default.login(req.body);
    return res.status(200).json({ token });
});
UsersController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService_1.default.create(req.body);
    return res.status(201).json({ user });
});
UsersController.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    const user = yield UserService_1.default.getById(userSession.id);
    return res.status(200).json({ user });
});
UsersController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    console.log(userSession);
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    const user = yield UserService_1.default.update(userSession.id, req.body);
    return res.status(200).json({ user });
});
UsersController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = req.userSession;
    if (!userSession)
        throw new errors_1.default("Unathorized!", 401);
    yield UserService_1.default.delete(userSession.id);
    return res.status(204).send();
});
UsersController.getPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // require token to get users!
    const { page = 1, size = 10, search = "" } = req.query;
    const users = yield UserService_1.default.getPagination(Number(page), Number(size), search);
    return res.json({ users });
});
exports.default = UsersController;
