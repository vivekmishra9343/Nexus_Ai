const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    fileUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["SUBMITTED", "REVIEWED"],
      default: "SUBMITTED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
