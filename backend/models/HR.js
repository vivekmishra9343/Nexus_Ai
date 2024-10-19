const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// HR Schema
const hrSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Export the HR model
module.exports = mongoose.model("HR", hrSchema);
