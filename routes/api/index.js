const router = require("express").Router();
const cityRoutes = require("./city");
const stateRoutes = require("./state");
const storeRoutes = require("./store");

// city routes
router.use("/city", cityRoutes);
// state routes
router.use("/state", stateRoutes);
// store routes
router.use("/store", storeRoutes);

module.exports = router;
