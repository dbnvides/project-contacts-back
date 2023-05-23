import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { AppError } from "../../errors/AppError";

const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
  const client: Client | null = await clientRepository.findOneBy({ id: clientId });

  //futuro middleware
  if (!client) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.remove(client);
};

export { deleteClientService };
