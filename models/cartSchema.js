const { Schema, model, Types, default: mongoose } = require("mongoose");

const CartElmentSchema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartElement = new model("CartElement", CartElmentSchema);
module.exports = CartElement;
