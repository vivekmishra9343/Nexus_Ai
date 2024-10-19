const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { username, password, isCandidate } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      isCandidate,
      isHR: !isCandidate,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, isCandidate: user.isCandidate, isHR: user.isHR },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      userId: user._id,
      isCandidate: user.isCandidate,
      isHR: user.isHR,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  // In a stateless JWT setup, logout is typically handled client-side
  // by removing the token. Here we'll just send a success message.
  res.json({ message: "Logged out successfully" });
};

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      // Configure your email service here
    });

    const mailOptions = {
      to: user.email,
      from: "youremail@example.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error in forgot password process",
        error: error.message,
      });
  }
};
