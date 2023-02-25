const { body, validationResult } = require("express-validator");
const express = require("express");
const contactRoute = express.Router();
const { contacts } = require("../model/contact");

const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");

contactRoute.get("/contacts", bearerAuth, acl("read"), getAllContacts);
contactRoute.post(
  "/contacts",
  [
    body("name").isLength({ min: 5 }).isAlpha(),
    body("email").isEmail(),
    body("subject").isAlpha(),
  ],
  createContact
);
contactRoute.delete(
  "/contacts/:id",
  bearerAuth,
  acl("delete"),
  deleteAllContacts
);

async function getAllContacts(req, res) {
  try {
    const allContacts = await contacts.findAll();
    res.status(200).send(allContacts);
  } catch (error) {
    res.status(403).send(error);
  }
}

async function createContact(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const newContact = req.body;
    const createdContact = await contacts.create(newContact);
    res.status(200).send(createdContact);
  } catch (error) {
    res.status(403).send(error);
  }
}

async function deleteAllContacts(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deletedContacts = await contacts.destroy({ where: { id: id } });
    res.status(204).send("Contact deleted.");
  } catch (error) {
    res.status(403).send(error);
  }
}

module.exports = contactRoute;
