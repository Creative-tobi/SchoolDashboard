const express = require("express");
const Books = require("../models/Books.models");
const Student = require("../models/Student.models");
const sendMail = require("../services/nodemailer");

//adding books by student
async function addBooks(req, res) {
  try {
    const { userID, bookname, author, description } = req.body;
    const student = await Student.findById(userID);
    console.log(userID);

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    const newBooks = await Books.create({
      author,
      description,
      bookname,
    });

    newBooks.save();

    sendMail.sendEmail(
      `${email}`,
      "MATERIALS ADDED",
      "You have succesfully added material(S) to your profile"
    );
    res
      .status(201)
      .send({ message: "Student books added succesfully", newBooks });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

//getting books
async function getBooks(req, res) {
  try {
    const { userID } = req.body;
    const allBooks = await Books.find();
    const student = await Student.findById(userID);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    sendMail.sendEmail(
          `${email}`,
          "VIEWING",
          `You are currently viewing available books`
        );
    res.status(201).send({ message: "Book fetched", allBooks });
  } catch (error) {}
}

module.exports = { addBooks, getBooks };
