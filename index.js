const argv = require("yargs").argv;

const dbServices = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await dbServices.getContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await dbServices.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await dbServices.addContact(name, email, phone);
      console.log(`${newContact} was added to db`);
      break;

    case "remove":
      const removedContact = await dbServices.removeContact(id);
      if (removedContact)
        return console.log(
          `Contact ${removedContact.name} was removed from db`
        );
      console.log(`Contact with id:${id} not found`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
