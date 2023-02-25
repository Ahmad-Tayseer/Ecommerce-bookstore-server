const { body, validationResult } = require("express-validator");
const express = require("express");
const bookRoute = express.Router();
const { books } = require("../model/book");
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");

bookRoute.get("/books", getBooks);
bookRoute.get("/books/:id", getOneBook);
bookRoute.post(
  "/books",
  [
    body("name").isLength({ min: 5 }),
    body("author").isLength({ min: 5 }),
    body("price").isNumeric(),
    body("rating").isNumeric(),
    body("topSelling").isBoolean(),
  ],
  bearerAuth,
  acl("create"),
  createBook
);
bookRoute.put("/books/:id", bearerAuth, acl("update"), updateBook);
bookRoute.delete("/books/:id", bearerAuth, acl("delete"), deleteBook);

async function getBooks(req, res) {
  try {
    const allBooks = await books.findAll();
    res.status(200).send(allBooks);
  } catch (error) {
    res.status(403).send(error);
  }
}

async function getOneBook(req, res) {
  try {
    const id = parseInt(req.params.id);
    const oneBook = await books.findOne({ where: { id: id } });
    res.status(200).send(oneBook);
  } catch (error) {
    res.status(403).send(error);
  }
}

async function createBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const newBook = req.body;
    const createdBook = await books.create(newBook);
    res.status(201).send(createdBook);
  } catch (error) {
    res.status(403).send(error);
  }
}

async function updateBook(req, res) {
  try {
    const id = parseInt(req.params.id);
    const newBook = req.body;
    const oldBook = await books.findOne({ where: { id: id } });
    const updatedBook = await oldBook.update(newBook);
    res.status(403).send(updatedBook);
  } catch (error) {
    res.status(403).send(error);
  }
}

async function deleteBook(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deletedBook = await books.destroy({ where: { id: id } });
    const deletedFavourite = await favourite.destroy({
      where: { id: id },
    });
    const deletedCart = await cart.destroy({ where: { id: id } });
    res.status(204).send("Book Deleted");
  } catch (error) {
    res.status(403).send(error);
  }
}

module.exports = bookRoute;
