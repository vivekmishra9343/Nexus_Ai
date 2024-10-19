const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    // Check for the token in the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by id
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Token is valid, but user not found" });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is invalid", error: error.message });
  }
};

module.exports = authenticate;
