const express = require("express");
const router = express.Router();
const { updateUserDetails } = require("../controllers/userController"); // Import the controller function

// Route to update user details
// Example: PUT /api/users/:id
router.put("/users/:id", updateUserDetails);

module.exports = router;
