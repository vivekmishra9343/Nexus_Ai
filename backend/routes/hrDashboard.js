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
  const express = require("express");
  const {
    getDashboardStats,
    getCandidatesList,
    updateApplicationStatus,
    updateInterviewProgress,
    getCandidateResume,
  } = require("../controllers/candidateController"); // Adjust the path as needed
  const router = express.Router();

  // Route to get dashboard statistics
  router.get("/dashboard/stats", async (req, res) => {
    const result = await getDashboardStats();
    if (result.success) {
      return res.json(result);
    } else {
      return res.status(500).json(result);
    }
  });

  // Route to get candidates list with pagination
  router.get("/candidates", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getCandidatesList(page, limit);
    if (result.success) {
      return res.json(result);
    } else {
      return res.status(500).json(result);
    }
  });

  // Route to update application status
  router.patch(
    "/candidates/:candidateId/applications/:jobId/status",
    async (req, res) => {
      const { candidateId, jobId } = req.params;
      const { status } = req.body; // Assume status is sent in the request body

      const result = await updateApplicationStatus(candidateId, jobId, status);
      if (result.success) {
        return res.json(result);
      } else {
        return res.status(500).json(result);
      }
    }
  );

  // Route to update interview progress
  router.patch(
    "/candidates/:candidateId/applications/:jobId/interview-progress",
    async (req, res) => {
      const { candidateId, jobId } = req.params;
      const { progress } = req.body; // Assume progress is sent in the request body

      const result = await updateInterviewProgress(
        candidateId,
        jobId,
        progress
      );
      if (result.success) {
        return res.json(result);
      } else {
        return res.status(500).json(result);
      }
    }
  );

  // Route to get candidate resume
  router.get("/candidates/:candidateId/resume", async (req, res) => {
    const { candidateId } = req.params;

    const result = await getCandidateResume(candidateId);
    if (result.success) {
      return res.json(result);
    } else {
      return res.status(404).json(result);
    }
  });

  module.exports = router;
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
