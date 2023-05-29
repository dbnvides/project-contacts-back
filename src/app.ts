import { Application } from "express";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import clientRoutes from "./routes/client.routes";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";
import contactRoutes from "./routes/contact.routes";
import cors from "cors";
import { loginRoutes } from "./routes/login.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/client", clientRoutes);
app.use("/contact", contactRoutes);
app.use("/login", loginRoutes);

app.use(handleAppErrorMiddleware);
export default app;
