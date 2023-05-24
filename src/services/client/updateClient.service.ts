import { Repository } from "typeorm";
import { TClient, TClientResponse, TClientUpdateRequest } from "../../interfaces/client.interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { clientSchemaResponse } from "../../schemas/client.schema";

const updateClientService = async (
  data: TClientUpdateRequest,
  clientEmail: string
): Promise<TClientResponse> => {
  const clientRepository: Repository<TClient> = AppDataSource.getRepository(Client);
  const oldClient = await clientRepository.findOne({
    where: {
      email: clientEmail,
    },
  });

  const client = clientRepository.create({
    ...oldClient,
    ...data,
  });

  await clientRepository.save(client);

  return clientSchemaResponse.parse(client);
};

export { updateClientService };
