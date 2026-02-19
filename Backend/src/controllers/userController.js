const User = require("../models/userModel");
const Property = require("../models/propertyModel");
const Booking = require('../models/bookingModel');
const Review = require("../models/reviewModel");
const Wishlist = require("../models/wishlistModel")
module.exports = {
    home: (req, res) => {
        res.send("hello user")
    },
    becomeHost: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"

                });
            }

            if (user.role === "host") {
                return res.status(400).json({
                    success: false,
                    message: "You are already a host"

                });
            }
            if (user.hostStatus === "pending") {
                return res.status(400).json({
                    success: false,
                    message: "Request already submitted"
                });
            }

            //user.role = "host";
            user.hostStatus = "pending";
            user.hostRequestedAt = new Date();
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Request send successfully.Waiting for admin approval",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            });

        }
        catch (error) {

            console.error("Become host error:", error);
            res.status(500).json({
                success: false,
                message: "Server error during role update"
            });
        }

    },
    getProperties: async (req, res) => {
        try {
            const properties = await Property.find({ status: "approved" });
            if (properties.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No properties found",
                    properties
                });
            }
            return res.status(200).json({
                success: true,
                message: "Properties fetched successfully",
                count: properties.length,
                properties
            });

        }
        catch (error) {
            console.error("Error fetching properties", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",

            });

        }
    },
    getSingleProperty: async (req, res) => {
        try {
            const propertyId = req.params.id;
            const property = await Property.findById(propertyId).populate("host", "name email");
            console.log("single proeprty", property)
            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "Property fetched successfully",
                property
            });

        }
        catch (error) {
            console.error("Error in fetching a property", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    getBookings: async (req, res) => {
        try {
            const userId = req.user.id;
            const bookings = await Booking.find({ user: userId }).populate("property");
            if (bookings.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "You have no bookings",
                    bookings: []
                });
            }
            res.status(200).json({
                success: true,
                message: "Bookings fetched successfully",
                count: bookings.length,
                bookings
            })


        }
        catch (error) {
            console.error("Error fetching bookings", error)
            return res.status(500).json({
                success: false,
                message: "Internal servere error"
            });

        }
    },
    searchProperties: async (req, res) => {
        try {
            const { location, guests, minPrice, maxPrice, propertyType, checkIn, checkOut } = req.query;
            let filter = { status: "approved" };
            if (location) {
                filter.location = { $regex: location, $options: "i" };
            }
            if (guests) {
                filter.maxGuests = { $gte: Number(guests) };
            }
            if (minPrice || maxPrice) {
                filter.pricePerNight = {};
                if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
                if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
            }
            if (propertyType) {
                filter.propertyType = propertyType;
            }
            // console.log("Search filter:", filter);
            let properties = await Property.find(filter);
            // console.log("Properties after filter:", properties);
            if (checkIn && checkOut) {
                const checkInDate = new Date(checkIn);
                const checkOutDate = new Date(checkOut);

                properties = properties.filter(property => {
                    return !property.blockedDate.some(block =>
                        block.startDate < checkOutDate && block.endDate > checkInDate
                    );
                });
            }




            return res.status(200).json({
                success: true,
                count: properties.length,
                properties
            });

        }
        catch (error) {
            console.error("Search error", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    addReview: async (req, res) => {
        try {
            const { bookingId, rating, comment } = req.body;
            const userId = req.user.id;
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }
            if (booking.status !== "completed") {
                return res.status(400).json({
                    message: "You can review after checkout."
                });

            }
            const existingReview = await Review.findOne({ booking: bookingId });
            if (existingReview) {
                return res.status(400).json({
                    message: "Review already submitted."
                });
            }
            const review = await Review.create({
                user: userId,
                booking: bookingId,
                property: booking.property,
                rating,
                comment
            });
            res.json({
                success: true,
                message: "Review added successfully.",
                review
            });


        }
        catch (error) {
            console.error("Review error", error);
            res.json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    getReview: async (req, res) => {
        try {
            const propertyId = req.params.id;
            const review = await Review.find({ property: propertyId }).populate("user", "name");
            if (review.length === 0) {
                return res.statue = s(200).json({
                    success: true,
                    message: "No reviews yet"
                });
            }
            res.status(200).json({
                success: true,
                count: review.length,
                review
            });

        }
        catch (error) {
            console.error("Review error", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })

        }
    },
    WishList: async (req, res) => {
        try {
            const propertyId = req.params.id;
            const userId = req.user.id;
            const property = await Property.findById(propertyId);
            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property not found."
                });
            }
            const existing = await Wishlist.findOne({ user: userId, property: propertyId });
            if (existing) {
                await Wishlist.deleteOne({ _id: existing._id });
                return res.status(200).json({
                    success: true,
                    message: "Removed from wishlist",
                    isWishlisted: false
                });
            }
            await Wishlist.create({
                user: userId,
                property: propertyId
            });
            return res.status(200).json({
                success: true,
                message: "Added to wishlist",
                isWishlisted: true,
                property
            });


        }
        catch (error) {
            console.error("Wishlist error", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    viewWishlist: async (req, res) => {
        try {
            const userId = req.user.id;
            const wishlistItems = await Wishlist.find({ user: userId }).populate("property");
            if (wishlistItems.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No items in wishlist",
                    count: 0,
                    property: []

                });
            }
            console.log("wishlist", wishlistItems)
            return res.status(200).json({
                success: true,
                count: wishlistItems.length,
                wishlistItems
            }
            )


        }
        catch (error) {
            console.error("Error fetching wishlist", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    getMe: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "user fetched successfully",
                user
            })

        }
        catch (error) {
            console.error("Error fetching user", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    }













































};