const express = require("express");

const { addBooks, getBooks } = require("../controller/books.controller");

const router = express.Router();
router.post("/books/materials", addBooks)
router.get("/books/allbooks", getBooks);

module.exports = router;