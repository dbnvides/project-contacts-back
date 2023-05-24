import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TClient } from "../interfaces/client.interfaces";
import { Client } from "../entities/client.entitie";
import { AppError } from "../errors/AppError";

const ensureClientExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const clientRepository: Repository<TClient> = AppDataSource.getRepository(Client);
  const clientEmail: string = req.params.email;

  const findClient = await clientRepository.findOne({
    where: { email: clientEmail },
  });

  if (!findClient) {
    throw new AppError("Client not found!");
  }

  return next();
};

export { ensureClientExistMiddleware };
