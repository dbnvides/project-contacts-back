import { Repository } from "typeorm";
import { Contact } from "../../entities/contact.entitie";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { contactSchemaResponse } from "../../schemas/contact.schema";
import { TContactResponse } from "../../interfaces/contact.interfaces";

const reatriveContactService = async (contactEmail: string): Promise<TContactResponse> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: {
      email: contactEmail,
    },
  });
  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  return contactSchemaResponse.parse(contact);
};

export { reatriveContactService };
