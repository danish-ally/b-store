const express = require("express");
const router = express.Router();
const Carousel = require("../../models/carousel");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

// Add Carousel
router.post("/", upload.single("image"), async (req, res) => {

  console.log("caling")
    try {
      let img = req.file;
  
      if (img !== undefined) {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
  
        let carousel = new Carousel({
          title: req.body.title,
          offerName: req.body.offerName,
          buttonLink: req.body.buttonLink,
          carouselImage: result.secure_url,
          cloudinary_id: result.public_id,
        });
  
        // Save content
        await carousel.save();
        res.json(carousel);
      } else {
        let carousel = new Carousel({
          title: req.body.title,
          offerName: req.body.offerName,
          buttonLink: req.body.buttonLink,
        });
  
        // Save content
        await carousel.save();
        res.json(carousel);
      }
    } catch (err) {
      console.log(err);
    }
  });



  module.exports = router;
