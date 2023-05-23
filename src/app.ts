import { Application } from "express";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import clientRoutes from "./routes/client.routes";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";

const app: Application = express();
app.use(express.json());
app.use("/client", clientRoutes);
app.use(handleAppErrorMiddleware);
export default app;
