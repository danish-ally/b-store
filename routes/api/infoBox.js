const express = require("express");
const router = express.Router();
const InfoBox = require("../../models/infoBox");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");





// get All infoBox
router.get("/", async (req, res) => {
  try {
    const infoBox = await (
      await InfoBox.find().sort({ created: -1 })
    ).filter((infobox) => infobox.isActive === true);

    res.json(infoBox);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});
// Add infoBox
router.post("/", upload.single("image"), async (req, res) => {

  console.log("caling")
    try {
      let img = req.file;
  
      if (img !== undefined) {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
  
        let infoBox = new InfoBox({
          title: req.body.title,
          highLightedName:req.body.highLightedName,
          description: req.body.description,
          backgroundColor: req.body.backgroundColor,
          buttonLink: req.body.buttonLink,
          infoBoxImage: result.secure_url,
          cloudinary_id: result.public_id,
        });
  
        // Save content
        await infoBox.save();
        res.json(infoBox);
      } else {
        let infoBox = new InfoBox({
          title: req.body.title,
          highLightedName:req.body.highLightedName,
          description: req.body.description,
          backgroundColor: req.body.backgroundColor,
          buttonLink: req.body.buttonLink,
        });
  
        // Save content
        await infoBox.save();
        res.json(infoBox);
      }
    } catch (err) {
      console.log(err);
    }
  });

//delete

  // delete infoBox by id
router.delete("/:id", async (req, res) => {
  try {
    const infoBoxId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: infoBoxId };

    await InfoBox.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "InfoBox has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});


  module.exports = router;
