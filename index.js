const { program } = require("commander");
program
  .option("-a, --action <type>", "contacts operation")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { nanoid } = require("nanoid");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`contact with id = ${id} does not exists`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(id, name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (!removedContact) {
        throw new Error(`contact with id = ${id} does not exists`);
      }
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program.parse(process.argv);
const options = program.opts();

invokeAction(options);
