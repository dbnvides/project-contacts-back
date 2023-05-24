import { Repository } from "typeorm";
import { TClientRequest, TClientResponse } from "../../interfaces/client.interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { clientSchemaResponse } from "../../schemas/client.schema";

const createClientService = async (data: TClientRequest): Promise<TClientResponse> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const client = clientRepository.create({
    ...data,
  });

  await clientRepository.save(client);

  return clientSchemaResponse.parse(client);
};

export { createClientService };
