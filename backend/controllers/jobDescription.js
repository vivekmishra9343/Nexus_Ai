const Candidate = require("../models/Candidate"); // Import your Candidate model
const { cloudinary } = require("../config/cloudinary"); // Import your Cloudinary configuration
const fs = require("fs"); // Import the file system module

exports.uploadResume = async (req, res) => {
  try {
    // Retrieve userId from cookies
    const userId = req.cookies.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if the candidate exists
    const candidate = await Candidate.findById(userId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Handle file upload using Cloudinary
    const file = req.file; // Multer stores the uploaded file in req.file
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw", // Use "raw" for non-image uploads (like PDFs)
      folder: "resumes", // Optional: specify a folder in your Cloudinary account
    });

    // Update candidate resume URL in the database
    candidate.resumeUrl = result.secure_url; // Save Cloudinary URL in your candidate model
    await candidate.save();

    // Delete the temporary file from the server after uploading to Cloudinary
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      }
    });

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: candidate.resumeUrl,
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    res
      .status(500)
      .json({ message: "Resume upload error", error: error.message });
  }
};
