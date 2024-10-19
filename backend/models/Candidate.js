const mongoose = require("mongoose");
const { Schema } = mongoose;

// Import the User schema
const User = require("./User");

const candidateSchema = new Schema(
  {
    // Use the user ID as the candidate ID directly
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: String }, // Store the file path or URL for the resume
    jobApplications: [
      {
        job: { type: Schema.Types.ObjectId, ref: "Job" }, // Reference to the Job model
        appliedOn: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["pending", "in_progress", "accepted", "rejected"],
          default: "pending",
        },
        interviewProgress: { type: Number, min: 0, max: 100, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

// Exporting the schema
module.exports = mongoose.model("Candidate", candidateSchema);
