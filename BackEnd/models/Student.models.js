const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true, unique: true},
    course:{type: String, required: true},
    role:{type: String, required: true, default: 'student'},
    level:{type: Number, required: true},
    semester:{type: String, required: true},
    faculty:{type: String, required: true}
})

module.exports = mongoose.model('Student', studentSchema)