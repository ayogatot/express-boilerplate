import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";
import Contacts from "../models/Contacts";
import pagedData from "../utils/PagedData";

const contactService = {};

contactService.add = async (contact) => {
  logger().info(`add contact, contact = ${objectToLogStr(contact)}`);

  contact.created_at = new Date().getTime();
  const newContact = await Contacts.create(contact);
  logger().info(`contact created, contact = ${newContact.id}`);

  // TODO: send email

  return newContact;
};

contactService.getAll = async (query) => {
  logger().info(`get all contact, with query = ${objectToLogStr(query)}`);
  const pageSize = 12;
  const start = query.pages ? query.pages * pageSize - pageSize : null;
  const { rows: contacts, count: totalItems } = await Contacts.findAndCountAll({
    limit: pageSize,
    offset: start,
  });
  const totalPage = Math.ceil(totalItems / pageSize);
  logger().info("sucessfully get all contacts");

  return pagedData(contacts, totalItems, totalPage, Number(query.pages || 1), totalItems > start + pageSize);
};

contactService.delete = async (contactId) => {
  logger().info(`delete contact, id = ${contactId}`);
  const existingContact = await Contacts.findOne({ where: { contact_id: contactId } });

  if (!existingContact) {
    throw new NotFoundError(`contact not found, id = ${contactId}`);
  }

  await existingContact.destroy();
  logger().info(`contact deleted, id = ${contactId}`);

  return existingContact;
};

export default contactService;
