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

const contactRoutes = Router();

contactRoutes.post(
  "/:email",
  ensureClientExistMiddleware,
  ensureDataIsValidMiddleware(contactSchemaRequest),
  ensureEmailExistMiddleware,
  createContactController
);
contactRoutes.get("/:email", ensureContactExistMiddleware, reatriveContactController);
contactRoutes.patch(
  "/:email",
  ensureContactExistMiddleware,
  ensureEmailExistMiddleware,
  ensureDataIsValidMiddleware(contactSchemaUpdate),
  updateContactController
);
contactRoutes.delete("/:email", ensureContactExistMiddleware, deleteContactController);

export default contactRoutes;
