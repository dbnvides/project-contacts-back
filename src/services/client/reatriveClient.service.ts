import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";

const reatriveClientService = async (clientId: string) => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Array<Client> = await clientRepository.find({
    where: {
      id: clientId,
    },
    relations: {
      contacts: true,
    },
  });

  return client;
};

export { reatriveClientService };
