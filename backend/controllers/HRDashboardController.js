const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

class HRDashboardController {
  // Get dashboard statistics
  static async getDashboardStats() {
    try {
      // Get count of candidates with pending interviews
      const interviewCount = await Candidate.countDocuments({
        "jobApplications.status": "in_progress",
      });

      // Get count of submitted resumes (candidates with resumes)
      const resumeCount = await Candidate.countDocuments({
        resume: { $exists: true, $ne: null },
      });

      return {
        success: true,
        data: {
          interviewScheduled: interviewCount,
          resumeSubmitted: resumeCount,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Error fetching dashboard statistics: " + error.message,
      };
    }
  }

  // Get candidates list with pagination
  static async getCandidatesList(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const candidates = await Candidate.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobApplications.job",
            foreignField: "_id",
            as: "jobData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $project: {
            name: "$userData.name",
            email: "$userData.email",
            resume: 1,
            currentStage: {
              $dateToString: {
                format: "%b %d",
                date: "$updatedAt",
              },
            },
            jobApplications: {
              $map: {
                input: "$jobApplications",
                as: "application",
                in: {
                  jobTitle: {
                    $let: {
                      vars: {
                        job: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$jobData",
                                as: "job",
                                cond: {
                                  $eq: ["$$job._id", "$$application.job"],
                                },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: "$$job.title",
                    },
                  },
                  status: "$$application.status",
                  interviewProgress: "$$application.interviewProgress",
                  appliedOn: "$$application.appliedOn",
                },
              },
            },
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]);

      const total = await Candidate.countDocuments();

      return {
        success: true,
        data: {
          candidates,
          pagination: {
            current: page,
            total: Math.ceil(total / limit),
            totalRecords: total,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Error fetching candidates list: " + error.message,
      };
    }
  }

  // Update application status
  static async updateApplicationStatus(candidateId, jobId, status) {
    try {
      const candidate = await Candidate.findOneAndUpdate(
        {
          _id: candidateId,
          "jobApplications.job": jobId,
        },
        {
          $set: {
            "jobApplications.$.status": status,
          },
        },
        { new: true }
      );

      return {
        success: true,
        data: candidate,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error updating application status: " + error.message,
      };
    }
  }

  // Update interview progress
  static async updateInterviewProgress(candidateId, jobId, progress) {
    try {
      const candidate = await Candidate.findOneAndUpdate(
        {
          _id: candidateId,
          "jobApplications.job": jobId,
        },
        {
          $set: {
            "jobApplications.$.interviewProgress": progress,
            "jobApplications.$.status":
              progress === 100 ? "accepted" : "in_progress",
          },
        },
        { new: true }
      );

      return {
        success: true,
        data: candidate,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error updating interview progress: " + error.message,
      };
    }
  }

  // Get candidate resume
  static async getCandidateResume(candidateId) {
    try {
      const candidate = await Candidate.findById(candidateId)
        .select("resume")
        .lean();

      if (!candidate) {
        return {
          success: false,
          error: "Candidate not found",
        };
      }

      if (!candidate.resume) {
        return {
          success: false,
          error: "No resume found for this candidate",
        };
      }

      return {
        success: true,
        data: {
          resumeUrl: candidate.resume,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Error fetching resume: " + error.message,
      };
    }
  }
}

module.exports = HRDashboardController;
