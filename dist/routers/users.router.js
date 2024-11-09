"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersConstroller_1 = __importDefault(require("../controllers/UsersConstroller"));
const Validate_middleware_1 = __importDefault(require("../middlewares/Validate.middleware"));
const UserSchemas_1 = __importDefault(require("../schemas/UserSchemas"));
const usersRouter = (0, express_1.Router)();
usersRouter.post("/", Validate_middleware_1.default.validadeBody(UserSchemas_1.default.creation), UsersConstroller_1.default.create);
usersRouter.patch("/:id", Validate_middleware_1.default.validadeBody(UserSchemas_1.default.update), Validate_middleware_1.default.validadeToken, UsersConstroller_1.default.update);
usersRouter.delete("/", Validate_middleware_1.default.validadeToken, UsersConstroller_1.default.delete);
usersRouter.get("/", Validate_middleware_1.default.validadeToken, UsersConstroller_1.default.get);
usersRouter.get("/pag", Validate_middleware_1.default.validadeToken, UsersConstroller_1.default.getPagination);
exports.default = usersRouter;
