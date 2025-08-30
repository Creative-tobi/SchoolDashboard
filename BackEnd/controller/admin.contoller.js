//Admin account
const express = require("express");
const Admin = require("../models/Admin.models")
const Student = require("../models/Student.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//creating new account
async function createAdmin(req, res) {
  try {
    const { name, email, password, courseTaken, department} =
      req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .send({ message: "Admin with email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await new Admin({
      name,
      email,
      password,
      courseTaken,
      department,
    });

    newAdmin.save();
    res.status(201).send({ message: "New Student registered", newAdmin });

    const adminResponse = { ...newAdmin.toObject() };
    delete adminResponse.password;
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

//Admin login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password not found" });
    }

    const study = await Admin.findOne({ email });
    if (!study) {
      return res.status(400).send({ message: "Student not found" });
    }

    const isValidPassword = await bcrypt.compare(password, study.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
        {id: study._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.status(201).send({message: "Admin login succesfully", token, study:{
        id: study._id,
        name: study.name,
        password: study.password
    }})
  } catch (error) {
    console.error(error);
        res.status(500).send({ message: "Internal server error" });
  }
}


//Adminprofile
async function adminProfile(req, res) {
    try {
        const adminID = req.params.id;
        const study = await Admin.findById(adminID).select('-password');
        
        if(!study){
           return  res.status(404).send({message: "Admin not found"})
        }
        res.status(201).send({message: "Admin profile", Admin})

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}
module.exports = { createAdmin, adminLogin, adminProfile };
