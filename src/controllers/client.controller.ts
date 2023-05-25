import { Request, Response } from "express";
import { createClientService } from "../services/client/createClient.service";
import { updateClientService } from "../services/client/updateClient.service";
import { deleteClientService } from "../services/client/deleteClient.service";
import { listClientContactsService } from "../services/client/listClient.service";
import { reatriveClientService } from "../services/client/reatriveClient.service";
import { listAllClientService } from "../services/client/listAllClient.service";

export const createClientController = async (req: Request, res: Response) => {
  const data = req.body;
  const newClient = await createClientService(data);
  return res.status(200).json(newClient);
};

export const reatriveClientController = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const listClientContact = await reatriveClientService(clientId);
  return res.json(listClientContact);
};

export const updateClientController = async (req: Request, res: Response) => {
  const data = req.body;
  const clientId = req.params.id;
  const updateClient = await updateClientService(data, clientId);
  return res.json(updateClient);
};

export const deleteClientController = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  await deleteClientService(clientId);
  return res.status(204).send();
};

export const listClientContactsController = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const listClientContact = await listClientContactsService(clientId);
  return res.json(listClientContact);
};

export const listAllClientController = async (req: Request, res: Response) => {
  const listClient = await listAllClientService();
  return res.json(listClient);
};
