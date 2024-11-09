"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersConstroller_1 = __importDefault(require("../controllers/UsersConstroller"));
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const UserSchemas_1 = __importDefault(require("../schemas/UserSchemas"));
const authRouter = (0, express_1.Router)();
authRouter.post("/", Validate_middleware_1.default.validadeBody(UserSchemas_1.default.login), UsersConstroller_1.default.login);
exports.default = authRouter;
