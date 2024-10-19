// routes/interviewRoutes.js

const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  handleInterviewAction,
  updateInterviewProgress,
  getApplicationHistory,
} = require("../controllers/interviewController");

// Middleware to check authentication (assumed to be implemented)
const { authenticate } = require("../middleware/auth");

// Route to get candidate dashboard data
router.get("/dashboard", authenticate, async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  const result = await getDashboardData(userId);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(400).json({ error: result.error });
  }
});

// Route to handle interview actions (join or complete)
router.post(
  "/interview/:interviewId/action",
  authenticate,
  handleInterviewAction
);

// Route to update interview progress
router.patch("/interview/progress", authenticate, async (req, res) => {
  const { applicationId, progress } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user
  const result = await updateInterviewProgress(userId, applicationId, progress);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(400).json({ error: result.error });
  }
});

// Route to get application history
router.get("/application/history", authenticate, async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  const { page, limit } = req.query; // Get pagination info from query params
  const result = await getApplicationHistory(
    userId,
    Number(page),
    Number(limit)
  );
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(400).json({ error: result.error });
  }
});

module.exports = router;
