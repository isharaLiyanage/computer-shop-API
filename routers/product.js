const Product = require("../Models/Product");

const router = require("express").Router();

//create product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const save = await newProduct.save();
    res.status(200).json(save);
  } catch (err) {
    console.log(err);
  }
});
//get all product
router.get("/all", async (req, res) => {
  const query = req.query.new;
  const qCat = req.query.cat;
  const qCategory = decodeURI(qCat);

  try {
    let products;
    if (query) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (qCat) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/brand", async (req, res) => {
  const qBrand = req.query.brand;
  const qBrandName = decodeURI(qBrand);

  try {
    const products = await Product.find({
      brandName: {
        $in: [qBrandName],
      },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get product details for search bar
router.get("/", async (req, res) => {
  const query = req.query.q;
  const keys = ["keywords", "title", "category"];

  try {
    const results = await Product.find({
      $or: keys.map((key) => ({ [key]: new RegExp(query, "i") })),
    }).limit(10);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
//product details
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update product
router.put("/update/:id", async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete product
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", async (req, res) => {
  try {
    const products = await Product.count();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
