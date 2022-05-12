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

router.post("/store/:id", upload.array("shopImage"), async (req, res) => {
  const store = await Store.findById(req.params.id);

  try {
    if (req.files.length < 5) {
      return res.status(400).json({
        // in case things don't work out
        msg: "Please upload minimum 5 images",
      });
    }

    console.log("first");
    if (req.files) {
      // if you are adding multiple files at a go
      console.log("fff");
      const imageURIs = []; // array to hold the image urls
      const imageIds = [];
      const files = req.files; // array of images
      // console.log(files);
      for (const file of files) {
        // console.log(file);/
        const result = await cloudinary.uploader.upload(file.path);
        console.log(file.path);
        imageURIs.push(result.secure_url);
        imageIds.push(result.public_id);
      }

      store["shopImage"] = imageURIs; // add the urls to object
      store["shopImageId"] = imageIds;

      const s1 = await store.save();
      return res.status(200).json({
        success: true,
        message: `images successfully uploaded!`,
        store: s1,
      });
    }

    // if (req.file && req.file.path) {
    //   // if only one image uploaded
    //   store["shopImage"] = req.file.path; // add the single
    //   const s1 = await store.save();
    //   return res.status(200).json({
    //     success: true,
    //     message: `images successfully uploaded!`,
    //     store: s1,
    //   });
    // }

    // you could save here without the image

    return res.status(400).json({
      // in case things don't work out
      msg: "Please upload an image",
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

module.exports = router;
