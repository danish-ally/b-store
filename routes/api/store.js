const express = require("express");
const router = express.Router();
const Store = require("../../models/store");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const key = require("../../config/key");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const fs = require("fs");

// get All store
router.get("/", async (req, res) => {
  const cityName = req.query.city;

  console.log(cityName);
  try {
    if (!cityName) {
      const stores = await (
        await Store.find().sort({ createdAt: -1 })
      ).filter((store) => store.isActive === true);

      res.json(stores);
    } else {
      const stores = await (
        await Store.find({ city: cityName }).sort({ createdAt: -1 })
      ).filter((store) => store.isActive === true);

      res.json(stores);
    }
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get stores by id
router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    res.json(store);
    // console.log(store.createdAt.getHours());
    // console.log(store.createdAt.getMinutes());
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// Add store

router.post("/", async (req, res) => {
  const token =
    (await jwt.decode(req.headers.authorization.split(" ")[1])) ||
    req.headers.authorization;

  const userId = token.id;
  console.log(userId);

  console.log("object");
  const store = new Store(Object.assign(req.body, { createdBy: userId }));
  console.log("object");

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(store.password, salt);

    store.password = hash;
    console.log("object");
    console.log("first");

    // if only one image uploaded
    const s1 = await store.save();
    return res.status(200).json({
      success: true,
      message: `Store has been added successfully!`,
      store: s1,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.....",
      });
    }
  }
});

// update store
router.put("/:id", async (req, res) => {
  try {
    const storeId = req.params.id;
    const update = req.body;
    const query = { _id: storeId };

    await Store.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Store has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// delete store by id
router.delete("/:id", async (req, res) => {
  try {
    const storeId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: storeId };

    await Store.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Store has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// get All store by user Id
router.get("/list/:id", async (req, res) => {
  try {
    const stores = await (
      await Store.find({ user: req.params.id }).sort({ createdAt: -1 })
    ).filter((store) => store.isActive === true);

    res.json(stores);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

const { accessSecret, accessTokenLife } = key.jwt;

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(400).json({ error: "You must enter an email address." });
  }

  if (!password) {
    return res.status(400).json({ error: "You must enter a password." });
  }

  Store.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .send({ error: "No user found for this email address." });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
        };

        jwt.sign(
          payload,
          accessSecret,
          { expiresIn: accessTokenLife },
          (err, AccessToken) => {
            res.status(200).json({
              success: true,
              AccessToken: `${AccessToken}`,
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            });
          }
        );
      } else {
        res.status(400).json({
          success: false,
          error: "Password Incorrect",
        });
      }
    });
  });
});

// No. of store addded today

router.get("/user/list/:id", async (req, res) => {
  try {
    let todayDate = new Date();

    let myDate =
      todayDate.getUTCFullYear() +
      "/" +
      (todayDate.getMonth() + 1) +
      "/" +
      todayDate.getUTCDate();

    if (!myDate) {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you gave date",
      });
    }

    const stores = await (
      await Store.find({
        user: req.params.id,
        createdAt: {
          $gte: new Date(new Date(myDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(myDate).setHours(23, 59, 59)),
        },
      }).sort({ createdAt: -1 })
    ).filter((store) => store.isActive === true);

    res.json(stores.length);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// getAllStoreByIdAndDateSortByDate by start date and end date
router.get("/user/list/dates/:id", async (req, res) => {
  try {
    let { startDate } = req.query;
    let { endDate } = req.query;

    if (!startDate) {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you gave date",
      });
    }

    if (!endDate) {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you gave date",
      });
    }

    const stores = await (
      await Store.find({
        user: req.params.id,
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      }).sort({ createdAt: -1 })
    ).filter((store) => store.isActive === true);

    res.json(stores);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
        message: err,
      });
    }
  }
});

// check shopcode
router.post("/check/shopCode", async (req, res) => {
  const shopCode = req.body.shopCode;
  console.log(shopCode);
  try {
    const existingShopCode = await Store.findOne({ shopCode });

    if (existingShopCode) {
      return res
        .status(400)
        .json({ error: "That shop code address is already in use." });
    }

    res.status(200).json({
      success: true,
      message: `You can proceed with this shop coode`,
      shopcode: shopCode,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

module.exports = router;
