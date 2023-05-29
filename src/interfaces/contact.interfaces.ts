import { z } from "zod";
import {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
} from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactUpdateRequest = DeepPartial<TContactRequest>;
type TContactResponse = z.infer<typeof contactSchemaResponse>;
export { TContact, TContactRequest, TContactUpdateRequest, TContactResponse };
