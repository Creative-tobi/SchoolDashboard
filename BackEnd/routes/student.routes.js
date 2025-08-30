const express = require("express");

const {
  createStudent,
  studentLogin,
  studentProfile,
} = require("../controller/student.controller");
const authmiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.post("/register", createStudent);
router.post("/login", studentLogin);
router.get("/profile", authmiddleware, studentProfile);

module.exports = router;