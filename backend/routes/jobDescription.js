const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jobDescriptionController = require("../controllers/jobDescription");

// Multer configuration for handling file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder (this can be a temp folder if you're using Cloudinary)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept resumes in PDF or DOCX format
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Unsupported file format"), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });

// Route for resume upload
router.post(
  "/upload-resume",
  upload.single("resume"), // Multer middleware to handle single file upload
  jobDescriptionController.uploadResume // Resume upload controller
);

module.exports = router;
