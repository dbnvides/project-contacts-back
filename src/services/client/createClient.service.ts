import { Repository } from "typeorm";
import { TClientRequest, TClientResponse } from "../../interfaces/client.interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { hash } from "bcryptjs";
import { clientSchemaResponse } from "../../schemas/client.schema";

const createClientService = async (data: TClientRequest): Promise<TClientResponse> => {
  const { email, fullName, password, telephone } = data;

  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const hashedPassword = await hash(password, 10);

  const client = clientRepository.create({
    ...data,
    password: hashedPassword,
  });

  await clientRepository.save(client);

  return clientSchemaResponse.parse(client);
};

export { createClientService };
