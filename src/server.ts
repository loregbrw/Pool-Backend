import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import AppDataSource from "./data-source";
import app from "./app";

export const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
});

const serverFacade = async () => {
    await AppDataSource.initialize();
    console.log("\nData source connected.");

    const PORT: number = Number(process.env.APP_PORT) || 3000;

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("update_project", (data) => {
            socket.broadcast.emit(`project_updated_${data.projectId}`, data);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    server.listen(PORT, () => {
        console.log(`\nServer executing on http://localhost:${PORT}/`);
    });

    process.on("SIGTERM", async () => {
        console.log("\nShutting down...");
        await AppDataSource.destroy();
        console.log("Data source disconnected.");
        process.exit(0);
    });
};

serverFacade();
