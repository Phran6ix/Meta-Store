const { Schema, model, default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  email: {
    type: String,
    validate: [validator.isEmail, "Please input correct email"],
    unique: [true, "Email already exist"],
  },
  phone: {
    type: String,
    validate: [validator.isMobilePhone, "Please input correct phone number"],
    unique: [true, "Number already exist"],
  },
  password: {
    type: String,
    select: false,
  },
  cart: [
    {
      type: mongoose.Types.ObjectId,
      ref: "CartElement",
    },
  ],
  resetPasswordToken: {
    type: String,
  },
});

const User = new model("User", userSchema);

module.exports = User;
