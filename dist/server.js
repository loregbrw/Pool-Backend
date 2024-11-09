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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const data_source_1 = __importDefault(require("./data-source"));
const app_1 = __importDefault(require("./app"));
const serverFacade = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.default.initialize();
    console.log("\nData source connected.");
    const PORT = Number(process.env.APP_PORT) || 3000;
    app_1.default.listen(PORT, () => {
        console.log(`\nServer executing on http://localhost:${PORT}/`);
    });
});
serverFacade();
