import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entitie";
import { TContact, TContactUpdateRequest } from "../../interfaces/contact.interfaces";
import { contactSchema } from "../../schemas/contact.schema";

const updateContactService = async (
  data: TContactUpdateRequest,
  contactId: string
): Promise<TContact> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  const oldContact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
  });

  const contact = contactRepository.create({
    ...oldContact,
    ...data,
  });

  await contactRepository.save(contact);

  return contactSchema.parse(contact);
};

export { updateContactService };
