const { verifyTokenAndAdmin, verifyTokenAndAuth } = require("../JwToken");
const Cart = require("../Models/Cart");

const router = require("express").Router();

router.post("/", verifyTokenAndAuth, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const save = await newCart.save();
    res.status(200).json(save);
  } catch (err) {
    console.log(err);
  }
});

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    console.log("cart");
    const items = await Cart.find({ userId: req.params.userId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all product
router.get("/all", async (req, res) => {
  try {
    const cart = await Cart.find();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product
router.put("/update/:id", async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete all product

module.exports = router;
