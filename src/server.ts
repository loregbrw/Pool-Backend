import "dotenv/config";
import AppDataSource from "./data-source";
import app from "./app";

const serverFacade = async () => {

    await AppDataSource.initialize();
    console.log("\nData source connected.");

    const PORT: number = Number(process.env.APP_PORT) || 3000;

    app.listen(PORT, () => {
        console.log(`\nServer executing on http://localhost:${PORT}/`);
    });
}

serverFacade();