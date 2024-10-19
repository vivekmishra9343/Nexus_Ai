const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");
const Interview = require("../models/Interview");
const Application = require("../models/Application");
const Notification = require("../models/Notification");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


const checkEligibility = async (jobTitle, resumePath) => {
  try {
    // Prepare the form data
    const form = new FormData();
    form.append('pdf', fs.createReadStream("./data/resumea.pdf")); // Attach the PDF file
    form.append('job_criteria', jobTitle); // Add the job title as job criteria

    // Send the POST request to the Flask API
    const response = await axios.post('http://127.0.0.1:5000/eligibility', form, {
      headers: form.getHeaders(),
    });

    // Return the eligibility status
    if (response.data && response.data.eligibility) {
      return response.data.eligibility === '1' || response.data.eligibility.toLowerCase() === 'yes'
        ? 'Eligible'
        : 'Not Eligible';
    } else {
      return 'Eligibility Check Failed';
    }
  } catch (error) {
    console.error('Error checking eligibility:', error.message);
    return 'Eligibility Check Failed';
  }
};


exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const candidate = await Candidate.findOne({ user: userId })
      .populate("user")
      .populate({
        path: "jobApplications.job",
        select: "title company description",
      })
      .lean();

    if (!candidate) {
      return res.status(404).json({ error: "Candidate profile not found" });
    }

    const applicationStatus = {
      hasResume: !!candidate.resume,
      totalApplications: candidate.jobApplications.length,
      inProgressInterview: candidate.jobApplications.find(
        (app) => app.status === "in_progress" && app.interviewProgress > 0
      ),
    };

    const upcomingInterview = await Interview.findOne({
      applicationId: { $in: candidate.jobApplications.map((app) => app._id) },
      status: "SCHEDULED",
      scheduledDate: { $gte: new Date() },
    }).sort({ scheduledDate: 1 });

    const fetchApplicationsWithEligibility = async (candidate, resumePath) => {
      // Use Promise.all to check eligibility for each job application in parallel
      const applications = await Promise.all(
        candidate.jobApplications.map(async (app) => {
          // Check eligibility for the specific job title
          const eligibilityStatus = await checkEligibility(app.job.title, resumePath);
    
          return {
            courseName: app.job.title,
            instructor: app.job.company,
            appliedOn: app.appliedOn,
            status: eligibilityStatus, // Update status with eligibility
            interviewProgress: app.interviewProgress,
          };
        })
      );
    
      // Sort applications by `appliedOn` date, descending
      return applications.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
    };

    const reminders = [];
    if (applicationStatus.inProgressInterview) {
      reminders.push({
        type: "interview_progress",
        message: "Continue your interview process",
        progress: applicationStatus.inProgressInterview.interviewProgress,
      });
    }

    res.json({
      user: {
        name: candidate.user.name,
        role: candidate.user.role || "Candidate",
        avatar: candidate.user.avatar,
      },
      applicationStatus,
      fetchApplicationsWithEligibility,
      reminders,
      upcomingInterview,
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

exports.handleInterviewAction = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { action } = req.body;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    const application = await Application.findOne({
      _id: interview.applicationId,
      userId,
    });

    if (!application) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to interview" });
    }

    switch (action) {
      case "join":
        if (interview.status !== "SCHEDULED") {
          return res
            .status(400)
            .json({ error: "Interview is not currently scheduled" });
        }
        interview.status = "IN_PROGRESS";
        await interview.save();
        return res.json({
          success: true,
          interviewLink: interview.interviewLink,
        });

      case "complete":
        if (interview.status !== "IN_PROGRESS") {
          return res
            .status(400)
            .json({ error: "Interview is not in progress" });
        }
        interview.status = "COMPLETED";
        await interview.save();
        application.status = "INTERVIEW_COMPLETED";
        await application.save();
        await new Notification({
          userId,
          message: `Interview completed for ${application.courseName}`,
          type: "SUCCESS",
        }).save();
        return res.json({
          success: true,
          message: "Interview marked as completed",
        });

      default:
        return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error in handleInterviewAction:", error);
    res.status(500).json({ error: "Failed to handle interview action" });
  }
};

// exports.updateInterviewProgress = async (req, res) => {
//   try {
//     const { applicationId, progress } = req.body;
//     const userId = req.user.id;

//     const candidate = await Candidate.findOneAndUpdate(
//       {
//         user: userId,
//         "jobApplications._id": applicationId,
//       },
//       {
//         $set: {
//           "jobApplications.$.interviewProgress": progress,
//           "jobApplications.$.status":
//             progress === 100 ? "completed" : "in_progress",
//         },
//       },
//       { new: true }
//     );

//     if (!candidate) {
//       return res.status(404).json({ error: "Application not found" });
//     }

//     res.json({
//       progress,
//       status: progress === 100 ? "completed" : "in_progress",
//     });
//   } catch (error) {
//     console.error("Error in updateInterviewProgress:", error);
//     res.status(500).json({ error: "Failed to update interview progress" });
//   }
// };

exports.getApplicationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const candidate = await Candidate.findOne({ user: userId })
      .populate({
        path: "jobApplications.job",
        select: "title company",
      })
      .select("jobApplications")
      .lean();

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const applications = candidate.jobApplications
      .sort((a, b) => b.appliedOn - a.appliedOn)
      .slice(skip, skip + limit)
      .map((app) => ({
        courseName: app.job.title,
        instructor: app.job.company,
        appliedOn: app.appliedOn,
        status: app.status,
      }));

    res.json({
      applications,
      pagination: {
        current: page,
        total: Math.ceil(candidate.jobApplications.length / limit),
        totalRecords: candidate.jobApplications.length,
      },
    });
  } catch (error) {
    console.error("Error in getApplicationHistory:", error);
    res.status(500).json({ error: "Failed to fetch application history" });
  }
};
