import { Repository } from "typeorm";
import {
  TClient,
  TClientContactResponse,
  TClientRequest,
  TClientResponse,
} from "../../interfaces/client.interfaces";
import { Contact } from "../../entities/contact.entitie";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { AppError } from "../../errors/AppError";
import { clientContactSchemaResponse } from "../../schemas/client.schema";

const reatriveClientService = async (clientEmail: string) => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Array<Client> = await clientRepository.find({
    where: {
      email: clientEmail,
    },
    relations: {
      contacts: true,
    },
  });

  return client;
};

export { reatriveClientService };
