const User = require("../models/User"); // Assuming you have a User model

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const { id, firstName, lastName, email, mobileNo, gender, address } =
      req.body; // Get ID from body

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        mobileNo,
        gender,
        address,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user details",
      error: error.message,
    });
  }
};