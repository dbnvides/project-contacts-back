import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { AppError } from "../../errors/AppError";
import { TContactRequest, TContactResponse } from "../../interfaces/contact.interfaces";
import { Contact } from "../../entities/contact.entitie";
import { contactSchemaResponse } from "../../schemas/contact.schema";

const createContactService = async (
  data: TContactRequest,
  clientId: string
): Promise<TContactResponse> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
  const contactRespository: Repository<Contact> = AppDataSource.getRepository(Contact);
  const client = await clientRepository.findOne({
    where: { id: clientId },
  });

  if (!client) {
    throw new AppError("Client not found!");
  }

  const contact: Contact = contactRespository.create({
    ...data,
    client,
  });

  await contactRespository.save(contact);

  return contactSchemaResponse.parse(contact);
};

export { createContactService };
