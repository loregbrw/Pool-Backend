import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const buildSettings = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
    const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}');
    const nodeEnv: string | undefined = process.env.NODE_ENV; 

    if (nodeEnv === 'test') {
        return {
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          entities: [entitiesPath],
        };
    }
    
    const dbType: string | undefined = process.env.DB_TYPE;
    if (!dbType) throw new Error("Missing env var: 'DB_TYPE'");
    
    const host: string | undefined = process.env.DB_HOST;
    if (!host) throw new Error("Missing env var: 'DB_HOST'");
    
    const username: string | undefined = process.env.DB_USERNAME;
    if (!username) throw new Error("Missing env var: 'DB_USERNAME'");
    
    const password: string | undefined = process.env.DB_PASSWORD;
    if (!password) throw new Error("Missing env var: 'DB_PASSWORD'");
    
    const database: string | undefined = process.env.DB_DATABASE;
    if (!database) throw new Error("Missing env var: 'DB_DATABASE'");
    
    return {
        type: dbType as "postgres" | "mssql",
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
}

const AppDataSource = new DataSource(buildSettings());

export default AppDataSource;