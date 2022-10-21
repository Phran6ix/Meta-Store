const express = require("express");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const ErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);

app.use(ErrorHandler);

module.exports = app;
