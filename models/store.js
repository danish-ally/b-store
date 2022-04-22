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
    },

    password: {
      type: String,
    },

    shopCode: {
      type: Number,
      unique: true,
    },
    shopName: {
      type: String,
    
    },

    shopType: {
      type: String,
    },
    shopCategory: {
      type: Array,
    },
    description: {
      type: String,
    },
    apiAddress: {
      type: String,
    },
    plotAddress: {
      type: String,
    },

    city: {
      type: Schema.Types.ObjectId,
    },

    phoneNo: {
      type: String,
    },

    profilePhoto: {
      type: String,
    },

    dateOfOpening: {
      type: Date,
    },

    openingHoursFrom: {
      type: String,
    },

    openingHoursTo: {
      type: String,
    },

    // Make it array of string
    operationalDays: {
      type: Array,
    },

    pincode: {
      type: String,
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
