"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersConstroller_controller_1 = __importDefault(require("../controllers/UsersConstroller.controller"));
const ValidateMiddleware_middleware_1 = __importDefault(require("../middlewares/ValidateMiddleware.middleware"));
const UserSchemas_schemas_1 = __importDefault(require("../schemas/UserSchemas.schemas"));
const usersRouter = (0, express_1.Router)();
usersRouter.post("/", ValidateMiddleware_middleware_1.default.validadeBody(UserSchemas_schemas_1.default.creation), UsersConstroller_controller_1.default.create);
usersRouter.patch("/:id", ValidateMiddleware_middleware_1.default.validadeBody(UserSchemas_schemas_1.default.update), ValidateMiddleware_middleware_1.default.validadeToken, UsersConstroller_controller_1.default.update);
usersRouter.delete("/", ValidateMiddleware_middleware_1.default.validadeToken, UsersConstroller_controller_1.default.delete);
usersRouter.get("/", ValidateMiddleware_middleware_1.default.validadeToken, UsersConstroller_controller_1.default.get);
usersRouter.get("/pag", ValidateMiddleware_middleware_1.default.validadeToken, UsersConstroller_controller_1.default.getPagination);
exports.default = usersRouter;
