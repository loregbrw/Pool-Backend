"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = __importDefault(require("../errors"));
const handleError = (err, req, res, next) => {
    if (err instanceof errors_1.default) {
        return res.status(err.status).json({ message: err.message });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({ message: err.flatten().fieldErrors });
    }
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
};
exports.default = handleError;
