import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entitie";
import { clientListAllSchema } from "../../schemas/client.schema";
import { TClientListAll } from "../../interfaces/client.interfaces";

const listAllClientService = async (): Promise<TClientListAll> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const listClient: Array<Client> = await clientRepository.find();

  return clientListAllSchema.parse(listClient);
};

export { listAllClientService };
