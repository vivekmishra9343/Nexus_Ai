const mongoose = require("mongoose");
const { Schema } = mongoose; // Importing Schema from mongoose

// Import the User schema
const User = require("./User");

const candidateSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  resume: { type: String }, // Store the file path or URL for the resume
});

// Exporting the schema
module.exports = mongoose.model("Candidate", candidateSchema);
