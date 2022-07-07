const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// InfoBox Schema
const InfoBoxSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    title: {
        type: String,
        // required: true,
        // unique: true,
    },

    highLightedName: {
        type: String,
        // required: true,
        // unique: true,
    },

    description: {
        type: String,
    },
    buttonLink: {
        type: String,
    },

    infoBoxImage: [
        {
            type: String,
        },
    ],
    cloudinary_id: [
        {
            type: String,
        },
    ],

    backgroundColor: {
        type: String,
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

module.exports = Mongoose.model("InfoBox", InfoBoxSchema);
