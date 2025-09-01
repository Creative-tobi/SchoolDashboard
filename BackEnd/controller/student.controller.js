const Admin = require("../models/Admin.models");
const Student = require("../models/Student.models");
const Books = require("../models/Books.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register Admin
async function createStudent(req, res) {
  try {
    const { name, email, password, level, course, semester, faculty } =
      req.body;

    const existingStudent = await Admin.findOne({ email });
    if (existingStudent) {
      return res.status(400).send({ error: "Admin with email already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      course,
      level,
      semester,
      faculty,
    });

    await newStudent.save();

    // generate token
    const token = jwt.sign(
      { id: newStudent._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).send({
      message: "Student registered successfully",
      token,
      admin: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        department: newStudent.department,
        course: newStudent.course,
        faculty: newStudent.faculty,
        semester: newStudent.semester,
        level: newStudent.level,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}

//Login Admin 
async function studentLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      admin: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}
//Admin Profile
async function studentProfile(req, res) {
  try {
    const studentID = req.params.id;
    const student = await Student.findById(studentID).select("-password");

    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.status(200).send({ message: "Student profile", student });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}




module.exports = {
  createStudent,
  studentLogin,
  studentProfile,
};
