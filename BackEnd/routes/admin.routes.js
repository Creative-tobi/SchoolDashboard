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
const authmiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.post("/admin/register", createAdmin);
router.post("/admin/login", adminLogin);
router.get("/admin/profile/:id", authmiddleware, roleMiddleware("admin"), adminProfile);
router.get("/admin/students",authmiddleware, roleMiddleware("admin"), getStudents);
router.delete("/admin/deletestudent/:id", authmiddleware, roleMiddleware("admin"), deleteStudent);

router.get("/admin/allbooks", authmiddleware, roleMiddleware("admin"), getBooks);
router.delete("/admin/deletebooks/:id",authmiddleware, roleMiddleware("admin"), deleteBooks);


module.exports = router;