const Admin = require("../models/Admin.models");
const Student = require("../models/Student.models");
const Books = require("../models/Books.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register Admin
async function createAdmin(req, res) {
  try {
    const { name, email, password, courseTaken, department } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send({ error: "Admin with email already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      courseTaken,
      department,
    });

    await newAdmin.save();

    // generate token
    const token = jwt.sign(
      { id: newAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).send({
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        department: newAdmin.department,
        courseTaken: newAdmin.courseTaken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

//Login Admin 
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}
//Admin Profile
async function adminProfile(req, res) {
  try {
    const adminID = req.params.id;
    const admin = await Admin.findById(adminID).select("-password");

    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }
    res.status(200).send({ message: "Admin profile", admin });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

// Extra Features
async function getStudents(req, res) {
  try {
    const allStudents = await Student.find().select("-password");
    res
      .status(200)
      .send({ message: "Students fetched", students: allStudents });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

async function deleteStudent(req, res) {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

async function getBooks(req, res) {
  try {
    const allBooks = await Books.find();
    res.status(200).send({ message: "Books fetched", books: allBooks });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

async function deleteBooks(req, res) {
  try {
    const deleted = await Books.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = {
  createAdmin,
  adminLogin,
  adminProfile,
  getStudents,
  deleteStudent,
  getBooks,
  deleteBooks,
};
