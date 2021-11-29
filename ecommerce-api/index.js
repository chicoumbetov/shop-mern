const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require('cors');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/ecommerce-api/auth", authRoute);
app.use("/ecommerce-api/users", userRoute);
app.use("/ecommerce-api/products", productRoute);
app.use("/ecommerce-api/carts", cartRoute);
app.use("/ecommerce-api/orders", orderRoute);
app.use("/ecommerce-api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000 || 3000, () => {
  console.log("Backend server is running!");
});
