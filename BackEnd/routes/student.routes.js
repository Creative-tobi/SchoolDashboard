const express = require("express");

const {
  createStudent,
  studentLogin,
  studentProfile,
} = require("../controller/student.controller");
const authmiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.post("/students/register", createStudent);
router.post("/students/login", studentLogin);
router.get("/students/profile/:id", authmiddleware, studentProfile);

module.exports = router;