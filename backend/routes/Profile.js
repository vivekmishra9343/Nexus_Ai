const express = require("express");
const router = express.Router();
const authControllers = require("./authControllers");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.post("/forgot-password", authControllers.forgotPassword);

module.exports = router;
