const express = require("express");
const router = express.Router();
const Carousel = require("../../models/carousel");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

// get All carousel
router.get("/", async (req, res) => {
  try {
    const carousel = await (
      await Carousel.find().sort({ created: -1 })
    ).filter((carousel) => carousel.isActive === true);

    res.json(carousel);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});
// Add Carousel
router.post("/", upload.single("image"), async (req, res) => {
  console.log("caling");
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

//delete

// delete Catgory by id
router.delete("/:id", async (req, res) => {
  try {
    const carouselId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: carouselId };

    await Carousel.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Carousel has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
