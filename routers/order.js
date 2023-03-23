const router = require("express").Router();
const Order = require("../models/Order");
const { json } = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("../JwToken");

//Create

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const saveOrder = await Order.find();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get USER ORDER

router.get("/find/:userId", async (req, res) => {
  try {
    console.log("order");
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/stats", async (req, res) => {
  try {
    const orders = await Order.count();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
