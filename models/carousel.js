const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Carousel Schema
const CarouselSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },

    offerName: {
        type: String,

    },

    buttonLink: {
        type: String
    },

    carouselImage: [
        {
            type: String,
        },
    ],
    cloudinary_id: [
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

module.exports = Mongoose.model("Carousel", CarouselSchema);
