import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { TLoginRequest } from "../../interfaces/login.interfaces";
import { Client } from "../../entities/client.entitie";

const createTokenService = async ({ email, password }: TLoginRequest): Promise<string> => {
  const clientsRepository = AppDataSource.getRepository(Client);

  const client = await clientsRepository.findOne({
    where: {
      email,
    },
  });

  if (!client) {
    throw new AppError("Invalid credentials", 403);
  }

  const passwordMatch = await compare(password, client.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign({ clientId: client.id }, process.env.SECRET_KEY!, {
    expiresIn: "1h",
    subject: client.id,
  });

  return token;
};

export { createTokenService };
