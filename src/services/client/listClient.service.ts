import { Repository } from "typeorm";
import { TClientContactResponse } from "../../interfaces/client.interfaces";
import { Contact } from "../../entities/contact.entitie";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { AppError } from "../../errors/AppError";
import { clientContactSchemaResponse } from "../../schemas/client.schema";

const listClientContactsService = async (clientId: string): Promise<TClientContactResponse> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: clientId,
    },
  });
  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const contacts: Contact[] = await contactRepository.find({
    where: {
      client: client,
    },
  });

  return clientContactSchemaResponse.parse(contacts);
};

export { listClientContactsService };
