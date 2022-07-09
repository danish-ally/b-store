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

  createdBy: {
    type: Schema.Types.ObjectId,
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

  isFeatured: {
    type: Boolean,
    default: false,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  isNewAddition: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },

  roomType: {
    type: String,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  isRemoved: {
    type: Boolean,
    default: false,
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Product", ProductSchema);
