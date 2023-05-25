import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  listAllClientController,
  listClientContactsController,
  reatriveClientController,
  updateClientController,
} from "../controllers/client.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { clientSchemaRequest, clientSchemaUpdate } from "../schemas/client.schema";
import { ensureClientExistMiddleware } from "../middlewares/ensureClientExistMiddleware.midleware";
import { ensureEmailExistMiddleware } from "../middlewares/ensureEmailExistMiddleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const clientRoutes = Router();

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchemaRequest),
  ensureEmailExistMiddleware,
  createClientController
);
clientRoutes.get("", listAllClientController);

clientRoutes.use(ensureAuthMiddleware);
clientRoutes.get("/:id", ensureClientExistMiddleware, listClientContactsController);
clientRoutes.patch(
  "/:id",
  ensureClientExistMiddleware,
  ensureEmailExistMiddleware,
  ensureDataIsValidMiddleware(clientSchemaUpdate),
  updateClientController
);
clientRoutes.delete("/:id", ensureClientExistMiddleware, deleteClientController);
clientRoutes.get("/info/:id", ensureClientExistMiddleware, reatriveClientController);

export default clientRoutes;
