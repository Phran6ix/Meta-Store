const Review = require("../models/reviewSchema");
const Product = require("../models/productSchema");
const { model } = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const factory = require("./factoryHandler");

exports.setProductUserId = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.product = req.params.product;
  next();
};
exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  const product = await Product.findById(req.params.product);

  product.review.push(review);
  product.save();

  res.status(201).json({
    status: "Success",
  });
});
// exports.createReview = factory.createADocument(Review)

exports.getReview = factory.getADocument(Review, "product");
exports.getReviews = factory.getDocuments(Review);
exports.deleteReview = factory.deleteADocument(Review);
