const CartElement = require("../models/cartSchema");
const Cart = require("../models/cartSchema");
const catchAsync = require("../utils/catchAsync");

exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { product } = req.body;
  const user = req.user;

  const cartItem = await Cart.create({
    product,
    quantity: req.body.quantity,
  });

  user.cart.push(cartItem.id);
  await user.save();

  res.status(201).json({
    status: "Success",
  });
});

exports.viewCart = catchAsync(async (req, res, next) => {
  const user = await req.user.populate({
    path: "cart",
    model: "CartElement",
  });

  for (product of user.cart) {
    await product.populate({
      path: "product",
      model: "Product",
      select: "-_id -__v",
    });
  }

  res.status(200).json({
    status: "Success",
    data: user.cart,
  });
});
