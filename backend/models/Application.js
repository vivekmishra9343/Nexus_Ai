// models/Application.js

const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "accepted", "rejected", "completed"],
      default: "pending",
    },
    appliedOn: {
      type: Date,
      default: Date.now,
    },
    interviewProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for job details
ApplicationSchema.virtual("jobDetails", {
  ref: "Job",
  localField: "jobId",
  foreignField: "_id",
  justOne: true,
});

// Method to update interview progress
ApplicationSchema.methods.updateInterviewProgress = function (progress) {
  this.interviewProgress = progress;
  this.status = progress === 100 ? "completed" : "in_progress";
  return this.save();
};

// Method to set interview
ApplicationSchema.methods.setInterview = function (interviewId) {
  this.interviewId = interviewId;
  this.status = "in_progress";
  return this.save();
};

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
