// controllers/auth.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res) => {
  console.log("Signup request received:", req.body);
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("New user created:", newUser);

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Login Controller
// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username); // Add this log

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found"); // Add this log
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match"); // Add this log
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    // Set the token and user details in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send response with user details
    res.status(200).json({
      success: true,
      message: "Login successful",
      userId: user._id,
      username: user.username,
      isCandidate: user.isCandidate,
      isHR: user.isHR,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Login error", error: error.message });
  }
};

// Logout Controller
// exports.logout = (req, res) => {
//   // In a stateless JWT setup, logout is typically handled client-side
//   // by removing the token. Here we'll just send a success message.
//   res.json({ message: "Logged out successfully" });
// };

// // Forgot Password Controller
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { username } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//     await user.save();

//     // Send email with reset link
//     const transporter = nodemailer.createTransport({
//       // Configure your email service here
//     });

//     const mailOptions = {
//       to: user.email,
//       from: "youremail@example.com",
//       subject: "Password Reset",
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         http://${req.headers.host}/reset/${resetToken}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error in forgot password process",
//       error: error.message,
//     });
//   }
// };
