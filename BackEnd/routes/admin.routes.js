const express = require("express");

const {
  createAdmin,
  adminLogin,
  adminProfile,
  getStudents,
  deleteStudent,
  getBooks,
  deleteBooks,
} = require("../controller/admin.contoller");

const router = express.Router();
router.post("/admin/register", createAdmin);
router.post("/admin/login", adminLogin);
router.get("/admin/profile", adminProfile);
router.get("/admin/students", getStudents);
router.delete("/admin/deletestudent/:id", deleteStudent);
router.get("/admin/allbooks", getBooks);
router.delete("/admin/deletebooks/:id", deleteBooks);


module.exports = router;