const { Timestamp } = require("mongodb");
const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Lead Schema
const storeSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    shopCode: {
      type: Number,
      unique: true,
    },
    shopName: {
      type: String,
      required: true,
    },

    shopType: {
      type: String,
      required: true,
    },
    shopCategory: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    apiAddress: {
      type: String,
      required: true,
    },
    plotAddress: {
      type: String,
      required: true,
    },

    city: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
    },

    dateOfOpening: {
      type: Date,
      required: true,
    },

    openingHoursFrom: {
      type: String,
      required: true,
    },

    openingHoursTo: {
      type: String,
      required: true,
    },

    // Make it array of string
    operationalDays: {
      type: Array,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Store", storeSchema);
