const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routers/user");
const orderRouter = require("./routers/order");
const cartRouter = require("./routers/cart");

const productRouter = require("./routers/product");
const authRouter = require("./routers/auth");
const passportRouter = require("./routers/authPassport");
const cors = require("cors");
const cookieSession = require("express-session");
const passport = require("passport");
require("./passport");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db-connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  cors({
    origin: ["https://computer-shop-seven.vercel.app", "http://127.0.0.1:5173"],
  })
  //   {
  //   origin: "http://127.0.0.1:5173/",
  //   optionsSuccessStatus: 200,
  //   credentials: true,
  // }
);
app.use(
  cookieSession({
    key: "Auth App",
    secret: process.env.PASS_SEC,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 26784000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
mongoose.set("strictQuery", true);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productRouter);

app.use("/api/auth", authRouter);
app.use("/api/google/auth", passportRouter);

app.listen(5000, () => {
  console.log("db-start");
});
