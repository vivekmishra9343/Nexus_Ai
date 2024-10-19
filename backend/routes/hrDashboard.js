const express = require("express");
const router = express.Router();
const HRDashboardController = require("../controllers/HRDashboardController");

// Get dashboard statistics
router.get("/dashboard/stats", async (req, res) => {
  const result = await HRDashboardController.getDashboardStats();
  res.json(result);
});

// Get candidates list
router.get("/candidates", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await HRDashboardController.getCandidatesList(page, limit);
  res.json(result);
});

// Get candidate's resume
router.get("/candidates/:id/resume", async (req, res) => {
  const result = await HRDashboardController.getCandidateResume(req.params.id);
  res.json(result);
});

// Update application status
router.patch(
  "/candidates/:candidateId/jobs/:jobId/status",
  async (req, res) => {
    const result = await HRDashboardController.updateApplicationStatus(
      req.params.candidateId,
      req.params.jobId,
      req.body.status
    );
    res.json(result);
  }
);

// Update interview progress
router.patch(
  "/candidates/:candidateId/jobs/:jobId/progress",
  async (req, res) => {
    const result = await HRDashboardController.updateInterviewProgress(
      req.params.candidateId,
      req.params.jobId,
      req.body.progress
    );
    res.json(result);
  }
);

module.exports = router;
