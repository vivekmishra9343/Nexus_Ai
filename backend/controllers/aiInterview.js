// controllers/interviewController.js

const cloudinary = require("../config/cloudinary"); // Import Cloudinary configuration

// In-memory store for interview sessions (replace with a database in production)
const interviewSessions = new Map();

// Sample demo questions (to be replaced with ML-generated questions)
const demoQuestions = [
  "Describe a time when you faced a significant challenge in a team project. How did you handle the situation, and what was the outcome?",
  "Tell me about a time when you had to adapt to a difficult situation.",
  "Describe a situation where you had to resolve a conflict with a coworker.",
  "Give an example of a time you showed leadership skills.",
  "Describe a project you're particularly proud of and your role in it.",
];

// Function to start an interview
exports.startInterview = (req, res) => {
  const sessionId = Date.now(); // Use timestamp as a simple session ID
  interviewSessions.set(sessionId, {
    currentQuestionIndex: 0,
    answers: [],
    startTime: Date.now(),
    // Automatically generate questions using a ML model here
    // questions: await mlModel.generateQuestions(), // ML model to generate questions
    questions: demoQuestions, // For now, use demo questions
  });

  // Start the video recording and real-time speech-to-text conversion
  // This would typically be handled by the front-end, sending data to the backend
  // Start recording video and send to backend automatically
  // const videoStream = startVideoRecording(); // Placeholder for video recording logic
  // startSpeechToText(sessionId); // Placeholder for speech-to-text logic

  res.json({
    sessionId,
    question: demoQuestions[0], // Send the first demo question
    totalQuestions: demoQuestions.length,
  });
};

// Function to submit an answer (automatically called by the recording system)
exports.submitAnswer = (req, res) => {
  const { sessionId, answer } = req.body; // Receive answer from the recording system
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  session.answers.push(answer);
  session.currentQuestionIndex++;

  if (session.currentQuestionIndex < demoQuestions.length) {
    res.json({
      nextQuestion: demoQuestions[session.currentQuestionIndex],
      questionNumber: session.currentQuestionIndex + 1,
    });
  } else {
    res.json({
      message: "Interview completed",
      answers: session.answers, // You may want to return all answers
    });
  }
};

// Function to end an interview
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

// Function to upload video (auto-upload handled by recording system)
exports.uploadVideo = (req, res) => {
  const { sessionId, video } = req.body; // Receive video data from the recording system
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  // Upload video to Cloudinary
  cloudinary.uploader
    .upload(video, { resource_type: "video" })
    .then((result) => {
      res.json({ message: "Video uploaded successfully", result });
    })
    .catch((error) => {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: "Failed to upload video" });
    });
};

// Function to handle real-time speech-to-text (this will depend on your speech-to-text service)
exports.handleSpeechToText = (req, res) => {
  const { sessionId, transcribedText } = req.body; // Receive transcribed text from the recording system
  const session = interviewSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Interview session not found" });
  }

  // Here you can send the transcribed text to the ML model for evaluation
  // const evaluationResult = await mlModel.evaluateResponse(transcribedText);

  res.json({ message: "Transcription received", transcribedText });
};
