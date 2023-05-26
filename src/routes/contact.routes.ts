import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { ensureClientExistMiddleware } from "../middlewares/ensureClientExistMiddleware.midleware";
import { contactSchemaRequest, contactSchemaUpdate } from "../schemas/contact.schema";
import {
  createContactController,
  deleteContactController,
  reatriveContactController,
  updateContactController,
} from "../controllers/contact.controller";
import { ensureEmailExistMiddleware } from "../middlewares/ensureEmailExistMiddleware";
import { ensureContactExistMiddleware } from "../middlewares/ensureContactExistMiddleware.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

const contactRoutes = Router();

contactRoutes.use(ensureAuthMiddleware);

contactRoutes.post(
  "/new",
  ensureClientExistMiddleware,
  ensureDataIsValidMiddleware(contactSchemaRequest),
  ensureEmailExistMiddleware,
  createContactController
);
contactRoutes.get(
  "/:id",
  ensureIsOwnerMiddleware,
  ensureContactExistMiddleware,
  reatriveContactController
);
contactRoutes.patch(
  "/:id",
  ensureIsOwnerMiddleware,
  ensureContactExistMiddleware,
  ensureEmailExistMiddleware,
  ensureDataIsValidMiddleware(contactSchemaUpdate),
  updateContactController
);
contactRoutes.delete(
  "/:email",
  ensureIsOwnerMiddleware,
  ensureContactExistMiddleware,
  deleteContactController
);

export default contactRoutes;
