const express = require("express");
const multer = require("multer");
const { uploadResume, applyForJob } = require("../controllers/jobDescription"); // Adjust the path as necessary

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Rename file to avoid conflicts
  },
});
const upload = multer({ storage });

// Route for uploading a resume
router.post("/upload-resume", upload.single("resume"), uploadResume); // Use "resume" as the field name in the form

// Route for applying for a job
router.post("/apply-job", applyForJob);

module.exports = router;
