import { Repository } from "typeorm";
import { Contact } from "../../entities/contact.entitie";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { contactSchemaResponse } from "../../schemas/contact.schema";
import { TContactResponse } from "../../interfaces/contact.interfaces";

const reatriveContactService = async (contactId: string): Promise<TContactResponse> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
  });
  console.log(contact);
  return contactSchemaResponse.parse(contact);
};

export { reatriveContactService };
