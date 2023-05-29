import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TClient } from "../interfaces/client.interfaces";
import { Client } from "../entities/client.entitie";
import { AppError } from "../errors/AppError";
import { TContact } from "../interfaces/contact.interfaces";
import { Contact } from "../entities/contact.entitie";

const ensureEmailExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const clientRepository: Repository<TClient> = AppDataSource.getRepository(Client);
  const contactRespository: Repository<TContact> = AppDataSource.getRepository(Contact);
  const { email } = req.body;

  if (email) {
    const findClient = await clientRepository.findOne({
      where: { email: email },
    });

    const findContact = await contactRespository.findOne({
      where: { email: email },
    });

    if (findClient || findContact) {
      throw new AppError("Email already exist!");
    }
  }

  return next();
};

export { ensureEmailExistMiddleware };
