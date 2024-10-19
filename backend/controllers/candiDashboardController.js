const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");
const Interview = require("../models/Interview");
const Application = require("../models/Application");
const Notification = require("../models/Notification");

// Get candidate dashboard data
const getDashboardData = async (userId) => {
  try {
    const candidate = await Candidate.findOne({ user: userId })
      .populate("user")
      .populate({
        path: "jobApplications.job",
        select: "title company description",
      })
      .lean();

    if (!candidate) {
      return {
        success: false,
        error: "Candidate profile not found",
      };
    }

    // Get application status
    const applicationStatus = {
      hasResume: !!candidate.resume,
      totalApplications: candidate.jobApplications.length,
      inProgressInterview: candidate.jobApplications.find(
        (app) => app.status === "in_progress" && app.interviewProgress > 0
      ),
    };

    // Get scheduled interview if exists
    const upcomingInterview = await Interview.findOne({
      applicationId: {
        $in: await Application.find({ userId }).select("_id"),
      },
      status: "SCHEDULED",
      scheduledDate: { $gte: new Date() },
    }).sort({ scheduledDate: 1 });

    // Get latest applications
    const applications = candidate.jobApplications
      .map((app) => ({
        courseName: app.job.title,
        instructor: app.job.company,
        appliedOn: app.appliedOn,
        status: app.status,
        interviewProgress: app.interviewProgress,
      }))
      .sort((a, b) => b.appliedOn - a.appliedOn);

    // Generate reminders
    const reminders = [];
    const activeInterview = applicationStatus.inProgressInterview;
    if (activeInterview) {
      reminders.push({
        type: "interview_progress",
        message: "Continue your interview process",
        progress: activeInterview.interviewProgress,
      });
    }

    const pendingApps = candidate.jobApplications.filter(
      (app) => app.status === "pending"
    );
    if (pendingApps.length > 0) {
      reminders.push({
        type: "pending_applications",
        message: `You have ${pendingApps.length} pending applications`,
      });
    }

    const selectedApps = candidate.jobApplications.filter(
      (app) =>
        app.status === "accepted" ||
        (app.status === "in_progress" && app.interviewProgress === 0)
    );
    if (selectedApps.length > 0) {
      reminders.push({
        type: "selected",
        message: "You have been selected for the next round",
        applicationId: selectedApps[0]._id,
      });
    }

    return {
      success: true,
      data: {
        user: {
          name: candidate.user.name,
          role: candidate.user.role || "Candidate",
          avatar: candidate.user.avatar,
        },
        applicationStatus,
        applications,
        reminders,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Error fetching dashboard data: " + error.message,
    };
  }
};

// Handle interview actions
const handleInterviewAction = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    const { action } = req.body;
    const userId = req.user.id;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      throw new Error("Interview not found");
    }

    const application = await Application.findOne({
      _id: interview.applicationId,
      userId,
    });

    if (!application) {
      throw new Error("Unauthorized access to interview");
    }

    switch (action) {
      case "join":
        if (interview.status !== "SCHEDULED") {
          throw new Error("Interview is not currently scheduled");
        }

        // Update interview status to in-progress
        interview.status = "IN_PROGRESS";
        await interview.save();

        res.json({
          success: true,
          interviewLink: interview.interviewLink,
        });
        break;

      case "complete":
        if (interview.status !== "IN_PROGRESS") {
          throw new Error("Interview is not in progress");
        }

        interview.status = "COMPLETED";
        await interview.save();

        // Update application status
        application.status = "INTERVIEW_COMPLETED";
        await application.save();

        // Create completion notification
        await new Notification({
          userId,
          message: `Interview completed for ${application.courseName}`,
          type: "SUCCESS",
        }).save();

        res.json({
          success: true,
          message: "Interview marked as completed",
        });
        break;

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    next(error);
  }
};

// Update interview progress
const updateInterviewProgress = async (userId, applicationId, progress) => {
  try {
    const candidate = await Candidate.findOneAndUpdate(
      {
        user: userId,
        "jobApplications._id": applicationId,
      },
      {
        $set: {
          "jobApplications.$.interviewProgress": progress,
          "jobApplications.$.status":
            progress === 100 ? "completed" : "in_progress",
        },
      },
      { new: true }
    );

    if (!candidate) {
      return {
        success: false,
        error: "Application not found",
      };
    }

    return {
      success: true,
      data: {
        progress,
        status: progress === 100 ? "completed" : "in_progress",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Error updating interview progress: " + error.message,
    };
  }
};

// Get application history
const getApplicationHistory = async (userId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const candidate = await Candidate.findOne({ user: userId })
      .populate({
        path: "jobApplications.job",
        select: "title company",
      })
      .select("jobApplications")
      .lean();

    if (!candidate) {
      return {
        success: false,
        error: "Candidate not found",
      };
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

    return {
      success: true,
      data: {
        applications,
        pagination: {
          current: page,
          total: Math.ceil(candidate.jobApplications.length / limit),
          totalRecords: candidate.jobApplications.length,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Error fetching application history: " + error.message,
    };
  }
};

module.exports = {
  getDashboardData,
  handleInterviewAction,
  updateInterviewProgress,
  getApplicationHistory,
};
