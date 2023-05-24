import { z } from "zod";
import { contactSchema, contactSchemaRequest } from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactUpdateRequest = DeepPartial<TContactRequest>;
export { TContact, TContactRequest, TContactUpdateRequest };
