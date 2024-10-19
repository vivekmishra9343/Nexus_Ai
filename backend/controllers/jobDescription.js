const cloudinary = require("cloudinary").v2;
const { Candidate, Job } = require("../models");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id;

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "resumes",
      public_id: `resume_${userId}_${Date.now()}`,
    });

    // Update or create candidate's resume URL in the database
    const candidate = await Candidate.findOneAndUpdate(
      { user: userId },
      { resume: result.secure_url },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    res
      .status(500)
      .json({ message: "Error uploading resume", error: error.message });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    // Find the candidate
    const candidate = await Candidate.findOne({ user: userId });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    if (!candidate.resume) {
      return res
        .status(400)
        .json({ message: "Please upload your resume before applying" });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existingApplication = candidate.jobApplications.find(
      (app) => app.job.toString() === jobId
    );

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Add the new job application
    candidate.jobApplications.push({
      job: jobId,
      appliedOn: new Date(),
      status: "pending",
      interviewProgress: 0,
    });

    await candidate.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Job application error:", error);
    res
      .status(500)
      .json({ message: "Error applying for job", error: error.message });
  }
};
