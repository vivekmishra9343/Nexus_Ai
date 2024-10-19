const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isCandidate: { type: Boolean, default: false },
  isHR: { type: Boolean, default: false },
  // Common fields that can be added later
  // firstName: String,
  // lastName: String,
  // email: { type: String, unique: true },
  // mobileNo: String,
  // gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  // address: String,
});

// export model
module.exports = mongoose.model("User", userSchema);
