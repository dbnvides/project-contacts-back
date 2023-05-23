import { Application } from "express";
import express from "express";
import "express-async-errors";
import "reflect-metadata";

const app: Application = express();
app.use(express.json());
export default app;
