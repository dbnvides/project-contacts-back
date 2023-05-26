import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { TClientAllContactResponse } from "../../interfaces/client.interfaces";
import { clientInfoSchemaResponse } from "../../schemas/client.schema";

const reatriveClientService = async (clientId: string): Promise<TClientAllContactResponse> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const client = await clientRepository.find({
    where: {
      id: clientId,
    },
    relations: {
      contacts: true,
    },
  });

  return clientInfoSchemaResponse.parse(client[0]);
};

export { reatriveClientService };
