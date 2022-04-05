const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// product Schema
const ProductSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  dimension: {
    type: String,
    required: true,
  },

  weight: {
    type: String,
    required: true,
  },

  subCategory: {
    type: Schema.ObjectId,
    required: true,
  },

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

module.exports = Mongoose.model("Product", ProductSchema);
