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
require("dotenv/config");
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const data_source_1 = __importDefault(require("../data-source"));
const errors_1 = __importDefault(require("../errors"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_ts_1 = require("crypto-ts");
class AuthService {
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.SECRET_KEY;
            if (!secret)
                throw new errors_1.default("SECRET_KEY is not defined in environment variables!", 500);
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secret);
                return decoded.id || null;
            }
            catch (error) {
                return null;
            }
        });
    }
}
_a = AuthService;
AuthService.login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    let user = yield userRepo.findOne({
        where: [
            { email: payload.login },
            { username: payload.login }
        ]
    });
    if (!user || user.deletedAt) {
        throw new errors_1.default("Invalid login!", 401);
    }
    if (!(yield (0, bcryptjs_1.compare)(payload.password, user.password))) {
        throw new errors_1.default("Invalid password!", 401);
    }
    const secret = process.env.SECRET_KEY;
    if (!secret)
        throw new errors_1.default("SECRET_KEY is not defined in environment variables!", 500);
    const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn: "60d" });
    return token;
});
AuthService.encryptData = (data) => {
    const secret = process.env.SECRET_KEY;
    if (!secret)
        throw new errors_1.default("SECRET_KEY is not defined in environment variables!", 500);
    return crypto_ts_1.AES.encrypt(data, secret).toString();
};
AuthService.decryptData = (encryptedData) => {
    const secret = process.env.SECRET_KEY;
    if (!secret)
        throw new errors_1.default("SECRET_KEY is not defined in environment variables!", 500);
    const bytes = crypto_ts_1.AES.decrypt(encryptedData, secret);
    const decryptedData = bytes.toString(crypto_ts_1.enc.Utf8);
    if (!decryptedData)
        throw new errors_1.default("Failed to decrypt data!", 500);
    return decryptedData;
};
exports.default = AuthService;
