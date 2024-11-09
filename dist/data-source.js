"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
require("dotenv/config");
const buildSettings = () => {
    const entitiesPath = path_1.default.join(__dirname, './entities/**.{ts,js}');
    const migrationPath = path_1.default.join(__dirname, './migrations/**.{ts,js}');
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'test') {
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [entitiesPath],
        };
    }
    const dbType = process.env.DB_TYPE;
    if (!dbType)
        throw new Error("Missing env var: 'DB_TYPE'");
    const host = process.env.DB_HOST;
    if (!host)
        throw new Error("Missing env var: 'DB_HOST'");
    const username = process.env.DB_USERNAME;
    if (!username)
        throw new Error("Missing env var: 'DB_USERNAME'");
    const password = process.env.DB_PASSWORD;
    if (!password)
        throw new Error("Missing env var: 'DB_PASSWORD'");
    const database = process.env.DB_DATABASE;
    if (!database)
        throw new Error("Missing env var: 'DB_DATABASE'");
    return {
        type: dbType,
        host: host,
        username: username,
        password: password,
        database: database,
        entities: [entitiesPath],
        migrations: [migrationPath],
        options: {
            trustServerCertificate: true,
            encrypt: true
        }
    };
};
const AppDataSource = new typeorm_1.DataSource(buildSettings());
exports.default = AppDataSource;
