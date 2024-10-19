const express = require("express");
const app = express();

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

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4000", // Adjust this as necessary
    credentials: true,
  })
);

// Routes
app.use("/api/v1/candidates", candidateRoutes); // Candidate routes
app.use("/api/v1/hr", hrRoutes); // HR dashboard routes
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

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
