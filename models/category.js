const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Category Schema
const CategorySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },

  productType: {
    type: Schema.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  categoryImage: [
    {
      type: String,
    },
  ],
  categoryImageId: [
    {
      type: String,
    },
  ],

  isActive: {
    type: Boolean,
    default: true,
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Category", CategorySchema);
