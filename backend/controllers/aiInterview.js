// controllers/interviewController.js
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require("../config/cloudinary"); // Import Cloudinary configuration
const FormData = require('form-data'); // Correct form-data package

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

const fetchQuestions = async () => {
  try {
    // Create FormData and append the PDF file
    const form = new FormData();
    form.append('pdf', fs.createReadStream('./data/resumea.pdf'));

    // Send PDF file to the Flask API
    const response = await axios.post('http://127.0.0.1:5000/questions', form, {
      headers: {
        ...form.getHeaders(), // Set the correct headers for multipart form-data
      },
    });
 // Check if Flask API response is successful
 if (response.status === 200) {
  return {
    success: true,
    questions: response.data.questions,
  };
} else {
  return {
    success: false,
    message: 'Failed to fetch questions from Flask API',
  };
}
} catch (error) {
console.error('Error fetching questions from Flask API:', error.message);
return {
  success: false,
  message: 'An error occurred while fetching questions.',
};
}
};


// Function to start an interview
exports.startInterview = async (req, res) => {
  const sessionId = Date.now(); // Use timestamp as a simple session ID
  const interviewSessions = new Map();

  // Await the fetched questions from the Flask API
  const fetchedQuestions = await fetchQuestions();

  // If questions are successfully fetched, start the interview
  if (fetchedQuestions.success) {
    interviewSessions.set(sessionId, {
      currentQuestionIndex: 0,
      answers: [],
      startTime: Date.now(),
      questions: fetchedQuestions.questions, // Use the fetched questions
    });
    res.json({
      success: true,
      sessionId,
      message: 'Interview started successfully',
      questions: fetchedQuestions.questions,
    });
  } else {
    // Handle the error case where questions could not be fetched
    res.status(500).json({
      success: false,
      message: fetchedQuestions.message,
    });
  }
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
