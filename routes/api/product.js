const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { CloudWatchLogs } = require("aws-sdk");
const SubCategory = require("../../models/subCategory");
const url = process.env.DATABASE_ACCESS;
var MongoClient = require('mongodb').MongoClient;


// get All products By User Id(Distributor app)
router.get("/distributor/:id", async (req, res) => {
  const categoryId = req.query.categoryId;
  const subCategoryId = req.query.subCategoryId
  const shopCode = req.query.shopCode;
  const searchKeyword = req.query.keyword;


  try {
    let products = await (
      await Product.find({ createdBy: req.params.id }).sort({ createdAt: -1 })
    ).filter((product) => product.isRemoved === false);
    console.log(products);

    if (categoryId) {
      products = products.filter((prod) => prod.category == categoryId);
    }

    if (subCategoryId) {
      products = products.filter((prod) => prod.subCategory == subCategoryId);
    }

    if (shopCode) {
      products = products.filter((prod) => prod.shopCode == shopCode);
    }

    if (searchKeyword) {
      const fproducts = products.filter((element) => {
        console.log(element.name);
        if (element.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
          return true;
        }
      });

      return res.json(fproducts);
    }

    return res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err.message,
      });
    }
  }
});

// get All products which is approved
router.get("/", async (req, res) => {
  const categoryId = req.query.categoryId;
  const subCategoryId = req.query.subCategoryId
  const shopCode = req.query.shopCode;
  const searchKeyword = req.query.keyword;
  const productTypeId = req.query.productTypeId;
  var lowPrice = req.query.lowPrice;
  var highPrice = req.query.highPrice;

  console.log(productTypeId)

  try {
    let products = await (
      await Product.find().sort({ createdAt: -1 })
    ).filter(
      (product) => product.isRemoved === false && product.isApproved === true
    );
    // let products = await (await Product.find({ price: { $gte: lowPrice, $lte: highPrice } }).sort({ createdAt: -1 })).filter(
    //   (product) => product.isRemoved === false && product.isApproved === true
    // );

    if (categoryId) {
      products = products.filter((prod) => prod.category == categoryId);
    }

    if (subCategoryId) {
      products = products.filter((prod) => prod.subCategory == subCategoryId);
    }

    if (shopCode) {
      products = products.filter((prod) => prod.shopCode == shopCode);
    }

    if (searchKeyword) {
      const fproducts = products.filter((element) => {
        console.log(element.name);
        if (element.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
          return true;
        }
      });


      return res.json(fproducts);
    }

    if (productTypeId) {
      console.log("dfdfd", productTypeId, "ll")
      products = products.filter((prod) => prod.productType == productTypeId);
    }


    return res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err.message,
      });
    }
  }
});

// get All products which is not approved
router.get("/notApproved", async (req, res) => {
  const categoryId = req.query.categoryId;
  const subCategoryId = req.query.subCategoryId
  const shopCode = req.query.shopCode;
  const searchKeyword = req.query.keyword;

  try {
    let products = await (
      await Product.find().sort({ createdAt: -1 })
    ).filter(
      (product) => product.isRemoved === false && product.isApproved === false
    );
    console.log(products);

    if (categoryId) {
      products = products.filter((prod) => prod.category == categoryId);
    }

    if (subCategoryId) {
      products = products.filter((prod) => prod.subCategory == subCategoryId);
    }

    if (shopCode) {
      products = products.filter((prod) => prod.shopCode == shopCode);
    }

    if (searchKeyword) {
      const fproducts = products.filter((element) => {
        console.log(element.name);
        if (element.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
          return true;
        }
      });

      return res.json(fproducts);
    }

    return res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err.message,
      });
    }
  }
});

// get All products no matter it is approved or not and also getAllProductByProductType
router.get("/allProducts", async (req, res) => {
  const categoryId = req.query.categoryId;
  const subCategoryId = req.query.subCategoryId;
  const shopCode = req.query.shopCode;
  const searchKeyword = req.query.keyword;
  const productTypeId = req.query.productTypeId;

  try {
    let products = await (
      await Product.find().sort({ createdAt: -1 })
    ).filter((product) => product.isRemoved === false);
    console.log(products);

    if (categoryId) {
      products = products.filter((prod) => prod.category == categoryId);
    }

    if (subCategoryId) {
      products = products.filter((prod) => prod.subCategory == subCategoryId);
    }

    if (shopCode) {
      products = products.filter((prod) => prod.shopCode == shopCode);
    }

    if (searchKeyword) {
      const fproducts = products.filter((element) => {
        console.log(element.name);
        if (element.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
          return true;
        }
      });

      if (productTypeId) {
        products = products.filter((prod) => prod.productType == productTypeId);
      }

      return res.json(fproducts);
    }

    return res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err.message,
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
      isRemoved: true,
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
    ).filter((product) => product.isRemoved === false);

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
    ).filter((product) => product.isRemoved === false);

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
    ).filter((product) => product.isRemoved === false);

    res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get All products By subCategoory Id
router.get("/subCategory/:id", async (req, res) => {
  const shopCode = req.query.shopCode;
  const searchKeyword = req.query.keyword;

  try {
    let products = await (
      await Product.find({ subCategory: req.params.id }).sort({ createdAt: -1 })
    ).filter((product) => product.isRemoved === false);
    console.log(products);



    if (shopCode) {
      products = products.filter((prod) => prod.shopCode == shopCode);
    }

    if (searchKeyword) {
      const fproducts = products.filter((element) => {
        console.log(element.name);
        if (element.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
          return true;
        }
      });

      return res.json(fproducts);
    }

    return res.json(products);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err.message,
      });
    }
  }
});


// get All productTypes
router.get("/types/productTypes", async (req, res) => {
  console.log("jhgjhg")
  try {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("be-store");
      //Find all documents in the customers collection:
      dbo.collection("productType").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
    });


  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again..//.",
        msg: err.message,
      });
    }
  }
});








// get All products with subCategoory name
router.get("/subCategory/all/products", async (req, res) => {

  console.log("inside")
  const catId = req.query.catId;

  try {
    var result = [];


    const subCategories = await (
      await SubCategory.find({ categoryId: catId })
    ).filter((subCategory) => subCategory.isActive === true);



    for (let i = 0; i < subCategories.length; i++) {
      const subCatId = subCategories[i]._id;
      const subCatName = subCategories[i].name;
      console.log(subCatName)
      let products = await (
        await Product.find({ subCategory: subCatId }).sort({ createdAt: -1 })
      ).filter((product) => product.isRemoved === false);
      console.log(products);
      result.push({ subCategoryName: subCatName, products: products })
    }

    return res.json(result);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err.message,
      });
    }
  }
});



module.exports = router;
