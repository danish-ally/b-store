const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// SubCategory Schema
const SubCategorySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  category: {
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

module.exports = Mongoose.model("SubCategory", SubCategorySchema);
