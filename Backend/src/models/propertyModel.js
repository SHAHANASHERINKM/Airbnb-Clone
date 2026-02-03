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
  validate: v => v.length > 0 // still ensures at least 1 image
},
    amenities:{ type:[String],
        enum:AMENITIES,
    },
    instructions: String,
    blockedDate: [{ startDate: Date, endDate: Date }],
    status: {
        type: String,
        enum: ["draft", "pending", "approved", "rejected"],
        default: "draft"
    },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);