const express = require("express");

const {
  createStudent,
  studentLogin,
  studentProfile,
} = require("../controller/student.controller");

const router = express.Router();
router.post("/register", createStudent);
router.post("/login", studentLogin);
router.get("/profile", studentProfile);

module.exports = router;