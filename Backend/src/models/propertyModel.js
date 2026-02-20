const mongoose = require("mongoose");
const AMENITIES = require("../constants/amenties");
const Schema = mongoose.Schema
const propertySchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        enum: ["entire", "private", "shared"],
        required: true
    },
    propertyType: {
        type: String,
        enum: ["house", "apartment", "villa", "hotel", "guesthouse"]
    },
    maxGuests: {
        type: Number,
        required: true,
        min: 1
    },
    beds: {
        type: Number,
        default: 1

    },
    bedrooms: {
        type: Number,
        default: 1
    },
    bathrooms: { type: Number, default: 1 },
    pricePerNight: { type: Number, required: true, min: 0 },
    images: {
        type: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true }
            }
        ],
        validate: [
            (val) => val.length >= 1 && val.length <= 5,
            "A property must have between 1 and 5 images"
        ]
    },
    amenities: {
        type: [String],
        enum: AMENITIES,
    },
    instructions: String,
    blockedDate: [{ startDate: Date, endDate: Date }],
    status: {
        type: String,
        enum: ["draft", "pending", "approved", "rejected"],
        default: "draft"
    },
   
   
    isActive: { type: Boolean, default: true },
    averageRating: {
        type: Number,
        default: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);