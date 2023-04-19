const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    category: { type: String },
    subcategory: { type: String },
    brandName: { type: String },
    keywords: [{ type: Array }],
    size: [{ type: Array }],
    color: [{ type: Array }],
    price: { type: Number, required: true },

    rating: { type: Number, default: 5 },

    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
