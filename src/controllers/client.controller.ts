import { Request, Response } from "express";
import { createClientService } from "../services/client/createClient.service";
import { updateClientService } from "../services/client/updateClient.service";
import { deleteClientService } from "../services/client/deleteClient.service";
import { listClientService } from "../services/client/listClient.service";

export const createClientController = async (req: Request, res: Response) => {
  const data = req.body;
  const newClient = await createClientService(data);
  return res.status(200).json(newClient);
};

export const reatriveClientController = async (req: Request, res: Response) => {
  const clientEmail = req.params.email;
  const listClientContact = await listClientService(clientEmail);
  return res.json(listClientContact);
};

export const updateClientController = async (req: Request, res: Response) => {
  const data = req.body;
  const clientEmail = req.params.email;
  const updateClient = await updateClientService(data, clientEmail);
  return res.json(updateClient);
};

export const deleteClientController = async (req: Request, res: Response) => {
  const clientEmail = req.params.email;
  await deleteClientService(clientEmail);
  return res.status(204).send();
};
