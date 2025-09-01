const express = require("express");
const Books = require("../models/Books.models");
const Student = require("../models/Student.models");

//adding books by student
async function addBooks(req, res){
    try {
        const {userID, bookname, author, description} = req.body;
        const student = await Student.findById(userID);
         if(!student){
            return res.status(404).send({message: "Student not found"});
         }

         const newBooks = await Books.create({
            userID,
            author,
            description,
            bookname
         });

         newBooks.save();
         res.status(201).send({message: "Student books added succesfully", newBooks});
    } catch (error) {
         console.error(error);
    res.status(500).send({ message: "Internal server error" });
    }
}


//getting books
async function getBooks(req, res) {
    try {
        const {userID} = req.body;
        const allBooks = await Books.find();
        const student = await Student.findById(userID);
        if (!student) {
          return res.status(404).send({ message: "Student not found" });
        }

        res.status(201).send({message: "Book fetched",allBooks })

    } catch (error) {
        
    }
}

module.exports = { addBooks, getBooks };