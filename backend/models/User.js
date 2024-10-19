const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

  // Common fields that can be added later
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null },
  mobileNo: { type: String, default: null },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
  address: { type: String, default: null },
});

// Export model
module.exports = mongoose.model("User", userSchema);
