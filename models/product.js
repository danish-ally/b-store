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

  shopCode: {
    type: Number,
  },

  dimension: {
    type: String,
    required: true,
  },

  weight: {
    type: String,
    required: true,
  },

  category: {
    type: Schema.ObjectId,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },

  productImage: [
    {
      type: String,
    },
  ],
  productImageId: [
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

module.exports = Mongoose.model("Product", ProductSchema);
