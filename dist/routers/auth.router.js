"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersConstroller_controller_1 = __importDefault(require("../controllers/UsersConstroller.controller"));
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const UserSchemas_schemas_1 = __importDefault(require("../schemas/UserSchemas.schemas"));
const authRouter = (0, express_1.Router)();
authRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(UserSchemas_schemas_1.default.login), UsersConstroller_controller_1.default.login);
exports.default = authRouter;
