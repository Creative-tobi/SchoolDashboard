const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userID:{type: Number, required: true},
    bookname:{type: String, required: true},
    author:{type: String, required: true},
    description:{type: String, required: true},
})

module.exports = mongoose.model('Books', bookSchema);