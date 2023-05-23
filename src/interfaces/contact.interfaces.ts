import { z } from "zod";
import { contactSchema, contactSchemaRequest } from "../schemas/contact.schema";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;

export { TContact, TContactRequest };
