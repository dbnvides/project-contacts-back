import { Repository } from "typeorm";
import { TClient, TClientResponse, TClientUpdateRequest } from "../../interfaces/client.interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { clientSchemaResponse } from "../../schemas/client.schema";
import { hash } from "bcryptjs";

const updateClientService = async (
  data: TClientUpdateRequest,
  clientId: string
): Promise<TClientResponse> => {
  const clientRepository: Repository<TClient> = AppDataSource.getRepository(Client);
  const oldClient = await clientRepository.findOne({
    where: {
      id: clientId,
    },
  });

  if (data.password) {
    const hashedPassword = await hash(data.password, 10);

    const client = clientRepository.create({
      ...oldClient,
      ...data,
      password: hashedPassword,
    });

    await clientRepository.save(client);

    return clientSchemaResponse.parse(client);
  }

  const client = clientRepository.create({
    ...oldClient,
    ...data,
  });

  await clientRepository.save(client);

  return clientSchemaResponse.parse(client);
};

export { updateClientService };
