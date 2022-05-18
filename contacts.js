const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const nanoid = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  return contacts.filter((contact) => contact.id !== contactId);
};

const addContact = async (name, email, phone) => {
  const contact = {
    id: nanoid(7),
    name,
    email,
    phone,
  };
  fs.appendFile(contactsPath, contact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
