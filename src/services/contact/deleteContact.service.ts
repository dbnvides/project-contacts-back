import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entitie";

const deleteContactService = async (contactId: string): Promise<void> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId,
    },
  });

  await contactRepository.remove(contact!);
};

export { deleteContactService };
