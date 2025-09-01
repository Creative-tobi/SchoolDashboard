//Student account
const express = require("express");
const Student = require("../models/Student.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//creating new account
async function createStudent(req, res) {
  try {
    const { name, email, password, level, course, semester, faculty } =
      req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .send({ message: "Student with email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      level,
      course,
      semester,
      faculty,
    });

    await newStudent.save();
    res.status(201).send({ message: "New Student registered", newStudent });

    const studentResponse = { ...newStudent.toObject() };
    delete studentResponse.password;
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

//student login
async function studentLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password not found" });
    }

    const study = await Student.findOne({ email });
    if (!study) {
      return res.status(400).send({ message: "Student not found" });
    }

    const isValidPassword = await bcrypt.compare(password, study.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: study._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).send({
      message: "Student login succesfully",
      token,
      study: {
        id: study._id,
        name: study.name,
        email: study.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

//student profile
async function studentProfile(req, res) {
  try {
    const studentID = req.params.id;
    const study = await Student.findById(studentID).select("-password");

    if (!study) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(201).send({ message: "Student profile", study });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = { createStudent, studentLogin, studentProfile };
