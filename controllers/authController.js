const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { hashPassword } = require("../helper/hashPassword");
const { sendToken, decode } = require("../helper/jwt");
const { comparePassword } = require("../helper/comparePasswords");

exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.confirmpassword) {
    return next(new AppError("Passwords are not the same", 500));
  }
  if (req.body.role == "admin") {
    return next(new AppError("You are not authorized for this operation", 401));
  }

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });

  const token = await sendToken(user.id);
  res.status(200).json({
    status: "Success",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  let user;
  const { query, password } = req.body;

  if (query.includes("@")) {
    user = await User.findOne({ email: query }).select("+password");
  } else {
    user = await User.findOne({ number: query }).select("+password");
  }
  if (!user || !(await comparePassword(password, user.password))) {
    return next(new AppError("Invalid credentials", 404));
  }

  const token = await sendToken(user.id);
  res.status(200).json({
    status: "Success",
    token,
    user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in", 400));
  }

  const decodeUser = await decode(token);
  const currentUser = await User.findById(decodeUser);
  if (!currentUser) {
    return next(new AppError("You are not logged in", 400));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized for this operation", 401)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await req.user.select("+password");

  if (!(await comparePassword(req.body.password, user.password))) {
    return next(new AppError("Password is not correct", 400));
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(new AppError("Passwords are not the same", 400));
  }
  user.password = req.body.newpassword;
  await user.save;

  res.status(204).json({
    status: "Success",
  });
});
