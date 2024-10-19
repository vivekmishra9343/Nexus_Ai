// routes/auth.js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
} = require("../controllers/authControllers");

// Define routes
router.post("/signup", signup);
router.post("/login", login);
// router.post("/logout", logout);
// router.post("/forgot-password", forgotPassword);

module.exports = router;
