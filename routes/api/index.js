const router = require("express").Router();
const cityRoutes = require("./city");
const stateRoutes = require("./state");
const storeRoutes = require("./store");
const categoryRoutes = require("./category");
const subCategoryRoutes = require("./subCategory");
const productRoutes = require("./product");
const uploadRoutes = require("./upload");
const roomTypeRoutes = require("./roomType");
const carouselRoutes = require("./carousel");
const infoBoxRoutes = require("./infoBox");



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
// upload routes
router.use("/upload", uploadRoutes);
// RoomType routes
router.use("/roomType", roomTypeRoutes);
// Carousel routes
router.use("/carousel", carouselRoutes);
// Carousel routes
router.use("/infoBox", infoBoxRoutes);

module.exports = router;
