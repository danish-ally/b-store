const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// get All products
router.get("/", async (req, res) => {
  const categoryId = req.query.category;
  const shopCode = req.query.shopCode;
  console.log(shopCode);
  try {
    if (!categoryId && !shopCode) {
      const products = await (
        await Product.find()
      ).filter((product) => product.isActive === true);
      return res.json(products);
    } else if (categoryId && shopCode) {
      const products = await (
        await Product.find({ category: categoryId, shopCode: shopCode })
      ).filter((product) => product.isActive === true);

      return res.json(products);
    } else if (categoryId && !shopCode) {
      const products = await (
        await Product.find({ category: categoryId })
      ).filter((product) => product.isActive === true);

      return res.json(products);
    } else {
      const products = await (
        await Product.find({ shopCode: shopCode })
      ).filter((product) => product.isActive === true);

      return res.json(products);
    }
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// Add Product
router.post("/", async (req, res) => {
  const token =
    (await jwt.decode(req.headers.authorization.split(" ")[1])) ||
    req.headers.authorization;

  const userId = token.id;
  console.log(userId);

  const product = new Product(Object.assign(req.body, { createdBy: userId }));

  try {
    const p1 = await product.save();
    res.status(200).json({
      success: true,
      message: `Product has been added successfully!`,
      product: p1,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again...",
      });
    }
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const update = req.body;
    const query = { _id: productId };

    await Product.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Product has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// delete product by id
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: productId };

    await Product.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// get All products by subcategory Id
router.get("/list/:id", async (req, res) => {
  try {
    const products = await (
      await Product.find({ subCategory: req.params.id })
    ).filter((product) => product.isActive === true);

    res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get All product by user Id
router.get("/list/user/:id", async (req, res) => {
  try {
    const products = await (
      await Product.find({ createdBy: req.params.id })
    ).filter((product) => product.isActive === true);

    res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get All Featured Product
router.get("/featuredProduct/list", async (req, res) => {
  console.log("object");
  try {
    const products = await (
      await Product.find()
    ).filter((product) => product.isFeatured === true);

    res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

//get All Products By roomType
router.get("/roomType/list", async (req, res) => {
  let { roomType } = req.query;

  try {
    const products = await (
      await Product.find({ roomType: roomType })
    ).filter((product) => product.isActive === true);

    res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

module.exports = router;
