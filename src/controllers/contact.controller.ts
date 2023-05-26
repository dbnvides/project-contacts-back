import { Request, Response } from "express";
import { createContactService } from "../services/contact/createContact.service";
import { reatriveContactService } from "../services/contact/reatriveContact.service";
import { updateContactService } from "../services/contact/updateContact.service";
import { deleteContactService } from "../services/contact/deleteContact.service";

export const createContactController = async (req: Request, res: Response) => {
  const data = req.body;
  const clientId = res.locals.clientId;
  const newContact = await createContactService(data, clientId);
  return res.status(200).json(newContact);
};

export const reatriveContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  const contact = await reatriveContactService(contactId);
  return res.json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const data = req.body;
  const contactId = req.params.id;
  const updateContact = await updateContactService(data, contactId);
  return res.json(updateContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  await deleteContactService(contactId);
  return res.status(204).send();
};
