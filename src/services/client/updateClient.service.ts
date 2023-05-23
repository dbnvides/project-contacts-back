import { Repository } from "typeorm";
import { TClient, TClientResponse, TClientUpdateRequest } from "../../interfaces/client.interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import { clientSchemaResponse } from "../../schemas/client.schema";

const updateClientService = async (
  data: TClientUpdateRequest,
  clientId: string
): Promise<TClientResponse> => {
  const { email, fullName, password, telephone } = data;

  const clientRepository: Repository<TClient> = AppDataSource.getRepository(Client);
  const oldClient = await clientRepository.findOneBy({ id: clientId });

  //futuro middleware
  if (email) {
    const findClient = await clientRepository.findOne({
      where: { email },
    });

    if (findClient) {
      throw new AppError("Client already exist!");
    }
  }

  if (password) {
    const hashedPassword = await hash(password, 10);
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
