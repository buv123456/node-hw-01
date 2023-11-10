const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function getContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(allContacts);
  } catch (error) {
    console.error(error.message);
  }
  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  return contactById || null;
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  const [contact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  console.log(contact);
  return contact;

  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return newContact;
  // Повертає об'єкт доданого контакту.
}

module.exports = { getContacts, getContactById, removeContact, addContact };
