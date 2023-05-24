import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { Contact } from "../entities/contact.entitie";

const ensureContactExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  const clientEmail: string = req.params.email;

  const findContact = await contactRepository.findOne({
    where: { email: clientEmail },
  });

  if (!findContact) {
    throw new AppError("Contact not found!");
  }

  return next();
};

export { ensureContactExistMiddleware };
