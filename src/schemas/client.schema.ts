import { z } from "zod";
import { contactSchema } from "./contact.schema";

const clientSchema = z.object({
  id: z.string(),
  fullName: z.string().max(200),
  password: z.string().min(6).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().length(11, { message: "for example number 12912345678" }),
});

const clientSchemaRequest = clientSchema.omit({
  id: true,
});

const clientSchemaResponse = clientSchema
  .extend({
    createdAt: z.date().or(z.string()),
  })
  .omit({ password: true });

const clientSchemaUpdate = clientSchema.omit({ id: true }).deepPartial();

const clientContactSchemaResponse = z.array(contactSchema);

const clientInfoSchemaResponse = clientSchemaResponse.extend({
  contacts: contactSchema.array(),
});

const clientListAllSchema = z.array(clientSchemaResponse);

export {
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
  clientSchemaUpdate,
  clientContactSchemaResponse,
  clientListAllSchema,
  clientInfoSchemaResponse,
};
