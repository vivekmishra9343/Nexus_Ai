const express = require("express");
const app = express();
const cloudinary = require("./config/cloudinary"); // Import Cloudinary configuration

// Importing routes
const candidateRoutes = require("./routes/candidateDashboard"); // Candidate-related routes
const hrRoutes = require("./routes/hrDashboard"); // HR dashboard related routes
const interviewRoutes = require("./routes/interview"); // Interview-related routes
const jobDescriptionRoutes = require("./routes/jobDescription"); // Job description related routes
const profileRoutes = require("./routes/Profile"); // Profile-related routes
const updateProfileRoutes = require("./routes/updateProfile"); // Update profile routes

const database = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
database.connect();

cloudinary.cloudinaryConnect();

// Middleware
const cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend URL
    credentials: true, // Allows cookies to be sent with the request
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add headers if needed
  })
);

// Routes
app.use("/api/v1/candidates", candidateRoutes); // Candidate routes
app.use("/api/v1/HR", hrRoutes); // HR dashboard routes
app.use("/api/v1/interview", interviewRoutes); // Interview routes
app.use("/api/v1/jobs", jobDescriptionRoutes); // Job description routes
app.use("/api/v1/profile", profileRoutes); // Profile routes
app.use("/api/v1/updateProfile", updateProfileRoutes); // Update profile routes

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
