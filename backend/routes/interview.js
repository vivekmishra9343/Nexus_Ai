const express = require("express");
const {
  startInterview,
  submitAnswer,
  getInterviewStatus,
  endInterview,
  uploadVideoChunk,
} = require("../controllers/aiInterview"); // Adjust the path as necessary

const router = express.Router();

// Route to start a new interview session
router.post("/start", startInterview);

// Route to submit an answer to a question
router.post("/submit-answer", submitAnswer);

// Route to get the current status of an interview session
router.get("/status/:sessionId", getInterviewStatus);

// Route to end an interview session
router.post("/end", endInterview);

// Route to upload a video chunk
router.post("/upload-chunk", uploadVideoChunk);

module.exports = router;
