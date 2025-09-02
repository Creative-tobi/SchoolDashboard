const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  bookname: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Books", bookSchema);
