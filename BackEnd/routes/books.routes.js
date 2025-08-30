const express = require("express");

const { addBooks, getBooks } = require("../controller/books.controller");

const router = express.Router();
router.post("/materials", addBooks)
router.get("/allbooks", getBooks);

module.exports = router;