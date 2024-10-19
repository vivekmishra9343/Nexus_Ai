const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    postedOn: { type: Date, default: Date.now },
    expiresOn: { type: Date },
    // Add other relevant fields
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
