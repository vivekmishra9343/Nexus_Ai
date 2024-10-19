const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    scheduledDate: { type: Date, required: true },
    interviewer: { type: String, required: true },
    status: {
      type: String,
      enum: ["SCHEDULED", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
    },
    meetingLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
