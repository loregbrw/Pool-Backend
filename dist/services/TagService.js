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
const data_source_1 = __importDefault(require("../data-source"));
const Tag_entity_1 = __importDefault(require("../entities/Tag.entity"));
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const errors_1 = __importDefault(require("../errors"));
class TagService {
}
_a = TagService;
TagService.create = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tagRepo = data_source_1.default.getRepository(Tag_entity_1.default);
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const tag = tagRepo.create(Object.assign(Object.assign({}, payload), { user: user }));
    const createdTag = yield tagRepo.save(tag);
    return Object.assign(Object.assign({}, createdTag), { user: undefined });
});
TagService.update = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const tagRepo = data_source_1.default.getRepository(Tag_entity_1.default);
    const tag = yield tagRepo.findOne({
        where: { id: id },
        relations: {
            user: true
        }
    });
    if (!tag)
        throw new errors_1.default("Tag not found!", 400);
    if (((_b = tag.user) === null || _b === void 0 ? void 0 : _b.id) !== userId)
        throw new errors_1.default("Unathorized!", 401);
    const updatedTag = tagRepo.create(Object.assign(Object.assign({}, tag), payload));
    const savedTag = yield tagRepo.save(updatedTag);
    return Object.assign(Object.assign({}, savedTag), { user: undefined });
});
TagService.delete = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const tagRepo = data_source_1.default.getRepository(Tag_entity_1.default);
    const tag = yield tagRepo.findOne({
        where: { id: id },
        relations: {
            user: true
        }
    });
    if (!tag)
        throw new errors_1.default("Tag not found!", 400);
    if (((_b = tag.user) === null || _b === void 0 ? void 0 : _b.id) !== userId)
        throw new errors_1.default("Unathorized!", 401);
    yield tagRepo.softDelete(id);
});
TagService.getByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId }, relations: { tags: true } });
    if (!user)
        throw new errors_1.default("User not found!", 404);
    return user.tags || [];
});
exports.default = TagService;
