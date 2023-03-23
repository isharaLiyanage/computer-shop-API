const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//register
router.post("/signIn", async (req, res) => {
  const newUser = new User({
    username: req.body.user.username,
    email: req.body.user.email,
    password: CryptoJS.AES.encrypt(
      req.body.user.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LogIn
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.user.username });
    !user && res.status(401).json("wrong User Name");

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.user.password &&
      res.status(401).json("wrong password");
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },

      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...other } = user._doc;
    return res.status(200).json({ ...other, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
