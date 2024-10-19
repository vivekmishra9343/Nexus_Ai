const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/aiInterview");

// Route to start an interview
router.post("/start", interviewController.startInterview);

// Route to submit an answer (automatically called by the recording system)
router.post("/submit-answer", interviewController.submitAnswer);

// Route to end an interview
router.post("/end", interviewController.endInterview);

// Route to upload video (auto-upload handled by recording system)
router.post("/upload-video", interviewController.uploadVideo);

// Route to handle real-time speech-to-text (receiving transcribed text)
router.post("/speech-to-text", interviewController.handleSpeechToText);

module.exports = router;
