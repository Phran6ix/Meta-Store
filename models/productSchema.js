const { model, Schema, Types } = require("mongoose");

const productSchema = new Schema({
  brand: {
    type: String,
    required: [true, "Input Brand name"],
  },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  review: [
    {
      type: Types.ObjectId,
      ref: "Review",
    },
  ],
  category: {
    type: String,
  },
  size: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  ware: {
    type: String,
    enum: ["Sneaker", "Handband", "WristWatch", "Sandal", "Shoe", "Jersey"],
  },
  images: {
    type: [String],
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
