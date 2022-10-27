const { Schema, model, Types } = require("mongoose");

const reviewSchema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Product",
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  user: {
    type: Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
