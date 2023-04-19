const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoogleSchema = new Schema({
  googleId: { type: String, required: true },
  displayName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  accessToken: { type: String },
});

module.exports = mongoose.model("Google", GoogleSchema);
