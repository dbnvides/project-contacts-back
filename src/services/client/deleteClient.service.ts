import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";

const deleteClientService = async (clientEmail: string): Promise<void> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
  const client: Client | null = await clientRepository.findOne({
    where: {
      email: clientEmail,
    },
  });

  await clientRepository.remove(client!);
};

export { deleteClientService };
