const factory = require("./factoryHandler");
const Product = require("../models/productSchema");
const catchAsync = require("../utils/catchAsync");
const { PromiseProvider } = require("mongoose");
const AppError = require("../utils/appError");

exports.createProduct = factory.createADocument(Product);
exports.getAProduct = factory.getADocument(Product);
exports.updateAProduct = factory.updateADocument(Product);
exports.getAllProducts = factory.getDocuments(Product);
exports.deleteAProduct = factory.deleteADocument(Product);

exports.getProductByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.body;
  const products = await Product.find({ category });

  if (!products) {
    return next(new AppError("Documents not found", 404));
  }

  res.status(200).json({
    status: "Success",
    range: products.length,
    data: products,
  });
});
