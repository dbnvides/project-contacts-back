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
clientRoutes.use(ensureAuthMiddleware);
clientRoutes.get("/:email", ensureClientExistMiddleware, listClientContactsController);
clientRoutes.patch(
  "/:email",
  ensureClientExistMiddleware,
  ensureEmailExistMiddleware,
  ensureDataIsValidMiddleware(clientSchemaUpdate),
  updateClientController
);
clientRoutes.delete("/:email", ensureClientExistMiddleware, deleteClientController);
clientRoutes.get("/info/:email", ensureClientExistMiddleware, reatriveClientController);
clientRoutes.get("", listAllClientController);
export default clientRoutes;
