const fs = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function getAllContacts(path) { await fs.readFile(path, "utf-8")};

async function updateContacts(path, data) await fs.writeFile(contactsPath, contacts);