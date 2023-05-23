import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  reatriveClientController,
  updateClientController,
} from "../controllers/client.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { clientSchemaRequest } from "../schemas/client.schema";

const clientRoutes = Router();

clientRoutes.post("", ensureDataIsValidMiddleware(clientSchemaRequest), createClientController);
clientRoutes.get("/:id", reatriveClientController);
clientRoutes.patch("/:id", updateClientController);
clientRoutes.delete("/:id", deleteClientController);

export default clientRoutes;
