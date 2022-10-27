const User = require("../models/userModel");
const factory = require("./factoryHandler");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addProductToWishlist = catchAsync(async (req, res, next) => {
  // Get the user
  const user = req.user;
  let wishlistArr = user.wishlist;
  const productid = req.params.product;
  // Create the subdocument
  if (wishlistArr.includes(productid)) {
    return next(
      new AppError("You already have this product in your wishlist", 400)
    );
  }
  wishlistArr.push(productid);

  // save the document
  await user.save();

  res.status(204).json({
    status: "Success",
  });
});

exports.viewWishlistProduct = catchAsync(async (req, res, next) => {
  const user = await req.user.populate({
    path: "wishlist",
    select: "-_id -__v",
  });
  const wishlist = user.wishlist;

  res.status(200).json({
    status: "Success",
    range: wishlist.length,
    data: wishlist,
  });
});

exports.getUser = factory.getADocument(User);
