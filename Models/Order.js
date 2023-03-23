const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: [
      {
        productId: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      lineOne: { type: String },
      lineTwo: { type: String },
      city: { type: String },

      State: { type: String },
      Country: { type: String },
    },
    status: { type: String, default: "pending.. " },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", productSchema);
