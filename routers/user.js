const { verifyTokenAndAdmin } = require("../JwToken");
const User = require("../models/User");

const router = require("express").Router();

router.get("/all", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(10).select("-password")
      : await User.find().select("-password");

    // const { password, ...other } = users._doc;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const save = await newUser.save();
    res.status(200).json(save);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    console.log(err);
  }
});
router.get("/stats", async (req, res) => {
  try {
    const users = await User.count();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
