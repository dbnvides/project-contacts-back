import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { AppError } from "../../errors/AppError";
import { TContact, TContactRequest } from "../../interfaces/contact.interfaces";
import { Contact } from "../../entities/contact.entitie";
import { contactSchema } from "../../schemas/contact.schema";

const createContactService = async (
  data: TContactRequest,
  clientEmail: string
): Promise<TContact> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
  const contactRespository: Repository<Contact> = AppDataSource.getRepository(Contact);
  const client = await clientRepository.findOne({
    where: { email: clientEmail },
  });

  if (!client) {
    throw new AppError("Client not found!");
  }

  const contact: Contact = contactRespository.create({
    ...data,
    client,
  });

  await contactRespository.save(contact);

  return contactSchema.parse(contact);
};

export { createContactService };
