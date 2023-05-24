import { z } from "zod";
import { contactSchema } from "./contact.schema";

const clientSchema = z.object({
  id: z.string(),
  fullName: z.string().max(200),
  password: z
    .string()
    .min(8, { message: "minimum 8 letter or numbers" })
    .max(20, { message: "maximum 20 letter or numbers" }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().length(11, { message: "for example number 12912345678" }),
});

const clientSchemaRequest = clientSchema.omit({
  id: true,
});

const clientSchemaResponse = clientSchema.omit({
  password: true,
});

const clientSchemaUpdate = clientSchema.omit({ id: true }).deepPartial();

const clientContactSchemaResponse = z.array(contactSchema);

export {
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
  clientSchemaUpdate,
  clientContactSchemaResponse,
};
