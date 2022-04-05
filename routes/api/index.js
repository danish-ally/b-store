const router = require("express").Router();
const cityRoutes = require("./city");
const stateRoutes = require("./state");
const storeRoutes = require("./store");
const categoryRoutes = require("./category");
const subCategoryRoutes = require("./subCategory");
const productRoutes = require("./product");

// city routes
router.use("/city", cityRoutes);
// state routes
router.use("/state", stateRoutes);
// store routes
router.use("/store", storeRoutes);
// category routes
router.use("/category", categoryRoutes);
// subcategory routes
router.use("/subCategory", subCategoryRoutes);
// product routes
router.use("/product", productRoutes);

module.exports = router;
