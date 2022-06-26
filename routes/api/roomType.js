const express = require("express");
const router = express.Router();
const RoomType = require("../../models/roomType");

// get All roomType
router.get("/", async (req, res) => {
  try {
    const roomTypes = await (
      await RoomType.find()
    ).filter((roomType) => roomType.isActive === true);

    res.json(roomTypes);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

// // get city by id
// router.get("/:id", async (req, res) => {
//   try {
//     const city = await City.findById(req.params.id);
//     res.json(city);
//   } catch (err) {
//     if (err) {
//       return res.status(400).json({
//         error: "Your request could not be processed. Please try again.",
//       });
//     }
//   }
// });

// Add RoomType
router.post("/", async (req, res) => {
  const roomType = new RoomType(Object.assign(req.body));

  try {
    const r1 = await roomType.save();
    res.status(200).json({
      success: true,
      message: `RoomType has been added successfully!`,
      types: r1,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again...",
      });
    }
  }
});

// // update city
// router.put("/:id", async (req, res) => {
//   try {
//     const cityId = req.params.id;
//     const update = req.body;
//     const query = { _id: cityId };

//     await City.findOneAndUpdate(query, update, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "City has been updated successfully!",
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: "Your request could not be processed. Please try again.",
//     });
//   }
// });

// delete roomType by id
router.delete("/:id", async (req, res) => {
  try {
    const roomTypeId = req.params.id;
    const update = {
      isActive: false,
    };
    const query = { _id: roomTypeId };

    await RoomType.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "RoomType has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});




module.exports = router;
