const express = require("express");
const router = express.Router();
const Category = require("../../models/category");

// get All Category
router.get("/", async (req, res) => {
  try {
    const categories = await (
      await Category.find()
    ).filter((category) => category.isActive === true);

    res.json(categories);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// get category by id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// Add category
router.post("/", async (req, res) => {
  const category = new Category(Object.assign(req.body));

  try {
    const c1 = await category.save();
    res.status(200).json({
      success: true,
      message: `Category has been added successfully!`,
      category: c1,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again...",
      });
    }
  }
});

// update category
router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body;
    const query = { _id: categoryId };

    await Category.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// delete Catgory by id
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: categoryId };

    await Category.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
