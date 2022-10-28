const express = require("express");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const ErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/cart", cartRoute);

app.use("/api/v1/product", productRoute);
app.use("/api/v1/reviews", reviewRoute);

app.use(ErrorHandler);

module.exports = app;
