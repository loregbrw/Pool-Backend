import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";

import usersRouter from "./routers/users.router";
import authRouter from "./routers/auth.router";
import handleError from "./middlewares/handleError.middleware";
import tagsRouter from "./routers/tags.router";
import projectsRouter from "./routers/projects.router";
import sprintsRouter from "./routers/sprints.router";
import columnsRouter from "./routers/columns.router";
import cardsRouter from "./routers/cards.router";
import sectionsRouter from "./routers/sections.router";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

app.use(express.json());
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization"]
}));

// app.use(cors(
//     {
//         origin: process.env.CORS_ORIGIN || "http://localhost:3000",
//         credentials: true
//     }
// ));


app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tags", tagsRouter);
app.use("/projects", projectsRouter);
app.use("/sprints", sprintsRouter);
app.use("/columns", columnsRouter);
app.use("/cards", cardsRouter);
app.use("/sections", sectionsRouter);

app.use(handleError);

export default app;