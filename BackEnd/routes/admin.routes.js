const express = require("express");

const {
  createAdmin,
  adminLogin,
  adminProfile,
} = require("../controller/admin.contoller");

const router = express.Router();
router.post("/admin/register", createAdmin);
router.post("/admin/login", adminLogin);
router.get("/admin/profile", adminProfile);


module.exports = router;