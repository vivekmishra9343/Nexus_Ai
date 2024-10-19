const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

class CandidateDashboardController {
  // Get candidate dashboard data
  static async getDashboardData(userId) {
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

      // Get notifications/reminders
      //   const reminders = [];

      // Check for interview progress
      const activeInterview = applicationStatus.inProgressInterview;
      if (activeInterview) {
        reminders.push({
          type: "interview_progress",
          message: "Continue your interview process",
          progress: activeInterview.interviewProgress,
        });
      }

      // Check for pending applications
      const pendingApps = candidate.jobApplications.filter(
        (app) => app.status === "pending"
      );
      if (pendingApps.length > 0) {
        reminders.push({
          type: "pending_applications",
          message: `You have ${pendingApps.length} pending applications`,
        });
      }

      // Check for selected applications
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
  }

  //   handle ineview actions
  static async handleInterviewAction(req, res, next) {
    try {
      const { interviewId } = req.params;
      const { action } = req.body;
      const userId = req.user.id;

      const interview = await Interview.findById(interviewId);
      if (!interview) {
        throw createError(404, "Interview not found");
      }

      const application = await Application.findOne({
        _id: interview.applicationId,
        userId,
      });

      if (!application) {
        throw createError(403, "Unauthorized access to interview");
      }

      switch (action) {
        case "join":
          if (interview.status !== "SCHEDULED") {
            throw createError(400, "Interview is not currently scheduled");
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
            throw createError(400, "Interview is not in progress");
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
          throw createError(400, "Invalid action");
      }
    } catch (error) {
      next(error);
    }
  }

  // Update interview progress
  static async updateInterviewProgress(userId, applicationId, progress) {
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
  }

  // Get application history
  static async getApplicationHistory(userId, page = 1, limit = 10) {
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
  }
}

module.exports = CandidateDashboardController;
