const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    number: { type: Number },
    wish: [{ type: Number }],

    address: {
      lineOne: { type: String },
      lineTwo: { type: String },
      city: { type: String },

      State: { type: String },
      Country: { type: String },
    },

    dateOfBirth: { type: String },
    img: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
