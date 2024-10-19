const express = require("express");
const { updateUserDetails } = require("../controllers/userController");

const router = express.Router();

// Update user details route
router.put("/user/update", updateUserDetails); // Using PUT method for updates

module.exports = router;
