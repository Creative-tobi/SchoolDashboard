const express = require("express");

const { addBooks, getBooks } = require("../controller/books.controller");
const authmiddleware = require("../middleware/auth.middleware")

const router = express.Router();
router.post("/books/materials",authmiddleware ,addBooks)
router.get("/books/allbooks", authmiddleware, getBooks);

module.exports = router;