import { z } from "zod";
import { contactSchema } from "./contact.schema";

const clientSchema = z.object({
  id: z.string(),
  fullName: z.string().max(200),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().length(11, { message: "for example number 12912345678" }),
});

const clientSchemaRequest = clientSchema.omit({
  id: true,
});

const clientSchemaResponse = clientSchema.extend({
  createdAt: z.date().or(z.string()),
});

const clientSchemaUpdate = clientSchema.omit({ id: true }).deepPartial();

const clientContactSchemaResponse = z.array(contactSchema);

const clientListAllSchema = z.array(clientSchema);

export {
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
  clientSchemaUpdate,
  clientContactSchemaResponse,
  clientListAllSchema,
};
