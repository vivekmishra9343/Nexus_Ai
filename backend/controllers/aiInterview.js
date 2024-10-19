// controllers/interviewController.js

const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// In-memory store for interview sessions (replace with a database in production)
const interviewSessions = new Map();

// Sample questions
const questions = [
  "Describe a time when you faced a significant challenge in a team project. How did you handle the situation, and what was the outcome?",
  "Tell me about a time when you had to adapt to a difficult situation.",
  "Describe a situation where you had to resolve a conflict with a coworker.",
  "Give an example of a time you showed leadership skills.",
  "Describe a project you're particularly proud of and your role in it.",
];

exports.startInterview = (req, res) => {
  const sessionId = uuidv4();
  interviewSessions.set(sessionId, {
    currentQuestionIndex: 0,
    answers: [],
    startTime: Date.now(),
    videoUploadId: uuidv4(), // Unique ID for the video upload
  });

  res.json({
    sessionId,
    question: questions[0],
    totalQuestions: questions.length,
    videoUploadId: interviewSessions.get(sessionId).videoUploadId,
  });
};

exports.submitAnswer = (req, res) => {
  const { sessionId, answer } = req.body;
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  session.answers.push(answer);
  session.currentQuestionIndex++;

  if (session.currentQuestionIndex < questions.length) {
    res.json({
      nextQuestion: questions[session.currentQuestionIndex],
      questionNumber: session.currentQuestionIndex + 1,
    });
  } else {
    res.json({
      message: "Interview completed",
    });
  }
};

exports.getInterviewStatus = (req, res) => {
  const { sessionId } = req.params;
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  res.json({
    currentQuestionIndex: session.currentQuestionIndex,
    totalQuestions: questions.length,
    timeElapsed: Date.now() - session.startTime,
  });
};

exports.endInterview = (req, res) => {
  const { sessionId } = req.body;
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  // Here you would typically save the interview results to a database
  // For this example, we'll just delete the session from memory
  interviewSessions.delete(sessionId);

  res.json({ message: "Interview ended successfully" });
};

exports.uploadVideoChunk = (req, res) => {
  const { sessionId, chunk } = req.body;
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  // Upload chunk to Cloudinary
  cloudinary.uploader.upload_chunked(
    chunk,
    {
      public_id: session.videoUploadId,
      resource_type: "video",
      chunk_size: 6000000, // 6MB chunks
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "Failed to upload video chunk" });
      }
      res.json({ message: "Chunk uploaded successfully", result });
    }
  );
};
