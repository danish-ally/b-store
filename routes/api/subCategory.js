const express = require("express");
const router = express.Router();
const SubCategory = require("../../models/subCategory");

// get All SubCategory
router.get("/", async (req, res) => {
  try {
    const subCategories = await (
      await SubCategory.find()
    ).filter((subCategory) => subCategory.isActive === true);

    res.json(subCategories);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get SubCategory by id
router.get("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    res.json(subCategory);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// Add SubCategory
router.post("/", async (req, res) => {
  const subCategory = new SubCategory(Object.assign(req.body));

  try {
    const s1 = await subCategory.save();
    res.status(200).json({
      success: true,
      message: `SubCategory has been added successfully!`,
      subCategory: s1,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again...",
      });
    }
  }
});

// update subCategory
router.put("/:id", async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const update = req.body;
    const query = { _id: subCategoryId };

    await SubCategory.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "SubCategory has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// delete SubCatgory by id
router.delete("/:id", async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: subCategoryId };

    await SubCategory.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "SubCategory has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// get All subCategory by category Id
router.get("/list/:id", async (req, res) => {
  try {
    const subCategories = await (
      await SubCategory.find({ categoryId: req.params.id })
    ).filter((subCategory) => subCategory.isActive === true);

    res.json(subCategories);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

module.exports = router;
