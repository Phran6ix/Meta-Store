const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const instance = require("../utils/payment");

exports.addRemoveProductToCart = catchAsync(async (req, res, next) => {
  const { action, product } = req.body;
  const user = req.user;

  if (action === "add") {
    const prod = user.cart.find((element) => {
      return element.product == product;
    });

    if (prod) {
      prod.quantity++;
    } else {
      user.cart.push({ product });
    }
  }

  if (action == "remove") {
    const prod = user.cart.find((element) => {
      return element.product == product;
    });
    if (!prod) {
      return next(new AppError("Product not available in cart", 404));
    }

    if (prod.quantity > 1) {
      prod.quantity--;
    } else {
      user.cart = user.cart.filter((element) => {
        return element != prod;
      });
    }
  }

  await user.populate({
    path: "cart",
    populate: "product",
  });

  let total = 0;

  user.cart.forEach((element) => {
    const eachPrice = element.product.price * element.quantity;
    total = total + eachPrice;
  });

  user.totalCartPrice = total;
  await user.save();

  res.status(201).json({
    status: "Success",
  });
});

exports.viewCart = catchAsync(async (req, res, next) => {
  const { user } = req;

  console.log(user.cart);
  await user.populate({
    path: "cart",
    populate: {
      path: "product",
      select: "brand name price color size",
    },
  });

  res.status(200).json({
    status: "Success",
    range: user.cart.length,
    data: user.cart,
    price: user.totalCartPrice,
  });
});

exports.removeProductFromCart = catchAsync(async (req, res, next) => {
  const user = await req.user.populate({
    path: "cart",
  });

  await user.save();

  const product = await Cart.findByIdAndDelete(req.params.cartId);
  if (!product) {
    return next(new AppError("Product is not cart", 404));
  }

  res.status(204).json({
    status: "Success",
  });
});

exports.checkOut = catchAsync(async (req, res, next) => {
  const user = await req.user.populate({
    path: "cart",
    populate: {
      path: "product",
      select: "brand name price color size",
    },
  });

  instance
    .post("/initialize", {
      email: `${req.user.email}`,
      amount: user.totalCartPrice,
    })
    .then((response) => {
      res.status(200).json({
        data: response.data,
      });
    })
    .catch((err) => console.log(err));
});
