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
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../data-source"));
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const errors_1 = __importDefault(require("../errors"));
const bcryptjs_1 = require("bcryptjs");
class UserService {
}
_a = UserService;
UserService.create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const findEmail = yield userRepo.findOne({
        where: [
            { email: payload.email },
            { username: payload.email }
        ]
    });
    if (findEmail)
        throw new errors_1.default("Email already in use!", 400);
    const findUsername = yield userRepo.findOne({
        where: [
            { username: payload.username },
            { username: payload.email }
        ]
    });
    if (findUsername)
        throw new errors_1.default("Username already in use!");
    const image = payload.image || "/User.png";
    const salt = yield (0, bcryptjs_1.genSalt)(12);
    const hashedPassword = yield (0, bcryptjs_1.hash)(payload.password, salt);
    const user = userRepo.create(Object.assign(Object.assign({}, payload), { password: hashedPassword, image: image }));
    const createdUser = yield userRepo.save(user);
    return Object.assign(Object.assign({}, createdUser), { password: undefined });
});
UserService.update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: id } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const updatedUser = userRepo.create(Object.assign(Object.assign({}, user), payload));
    const savedUser = yield userRepo.save(updatedUser);
    console.log(savedUser);
    return Object.assign(Object.assign({}, savedUser), { password: undefined });
});
UserService.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: id } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    yield userRepo.softDelete(id);
});
UserService.getPagination = (page, size, search) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const users = yield userRepo.find({
        where: [
            { name: (0, typeorm_1.Like)(`%${search}%`) },
            { username: (0, typeorm_1.Like)(`%${search}%`) },
            { email: (0, typeorm_1.Like)(`%${search}%`) }
        ],
        withDeleted: false,
        take: size,
        skip: (page - 1) * size,
    });
    return users.map(user => {
        return Object.assign(Object.assign({}, user), { password: undefined });
    });
});
UserService.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: id }, withDeleted: false });
    if (!user)
        throw new errors_1.default("User not found!", 404);
    return Object.assign(Object.assign({}, user), { password: undefined });
});
exports.default = UserService;
