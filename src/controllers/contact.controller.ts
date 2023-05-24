import { Request, Response } from "express";
import { createContactService } from "../services/contact/createContact.service";
import { reatriveContactService } from "../services/contact/reatriveContact.service";
import { updateContactService } from "../services/contact/updateContact.service";
import { deleteContactService } from "../services/contact/deleteContact.service";

export const createContactController = async (req: Request, res: Response) => {
  const data = req.body;
  const clientEmail = req.params.email;
  const newContact = await createContactService(data, clientEmail);
  return res.status(200).json(newContact);
};

export const reatriveContactController = async (req: Request, res: Response) => {
  const contactEmail = req.params.email;
  const contact = await reatriveContactService(contactEmail);
  return res.json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const data = req.body;
  const contactEmail = req.params.email;
  const updateContact = await updateContactService(data, contactEmail);
  return res.json(updateContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const contactEmail = req.params.email;
  await deleteContactService(contactEmail);
  return res.status(204).send();
};
