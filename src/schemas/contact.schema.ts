import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  fullName: z.string().length(200),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().length(11, { message: "for example number 12912345678" }),
});

const contactSchemaRequest = contactSchema.omit({
  id: true,
});

const contactSchemaResponse = contactSchema.extend({
  createdAt: z.date().or(z.string()),
});
const contactSchemaUpdate = contactSchema.omit({ id: true }).deepPartial();
export { contactSchema, contactSchemaRequest, contactSchemaUpdate, contactSchemaResponse };
