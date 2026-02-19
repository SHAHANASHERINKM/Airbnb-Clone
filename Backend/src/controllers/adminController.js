
const User = require('../models/userModel');
const Property = require("../models/propertyModel");
const CancellationPolicy = require('../models/cancellationPolicyModel');
const Booking = require("../models/bookingModel");
module.exports = {
    home: (req, res) => {
        res.send("hello admin")
    },
    blockUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist"
                });
            }
            if (user.userStatus === "blocked") {
                return res.status(400).json({
                    success: false,
                    message: "User is already blocked"
                });

            }
            user.userStatus = "blocked";
            await user.save();
            return res.status(200).json({
                success: true,
                message: "User banned successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    userStatus: user.userStatus,
                    createdAt: user.createdAt
                }
            })

        }
        catch (error) {
            console.error("Block user error", error);
            res.status(500).json({
                success: false,
                message: "Internal Server error"
            });


        }
    },

    unblockUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            if (user.userStatus == "active") {
                return res.status(400).json({
                    success: false,
                    message: "User is already unblocked"

                });
            }
            user.userStatus = "active";
            await user.save()

            res.status(200).json({
                success: true,
                message: "User unblocked successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    userStatus: user.userStatus,
                    createdAt: user.createdAt
                }
            })

        }
        catch (error) {
            console.error("Error during unblocking user", error);
            res.status(500).json({
                success: false,
                message: "Internal Server error"
            });


        }
    },
    blockHost: async (req, res) => {
        try {
            const hostId = req.params.id;
            const host = await User.findById(hostId);
            if (!host) {
                return res.status(404).json({
                    success: false,
                    message: "Host doesnt exist"
                });
            }
            if (host.hostStatus == "blocked") {
                return res.status(400).json({
                    success: false,
                    message: "Host already blocked"
                });
            }
            host.hostStatus = "blocked";
            await host.save();
            return res.status(200).json({
                success: false,
                message: "Host bloacked successfully",
                user: {
                    id: host._id,
                    name: host.name,
                    email: host.email,
                    role: host.role,
                    hostStatus: host.hostStatus,
                    createdAt: host.createdAt
                }

            });


        }
        catch (error) {
            console.error("Error bloacking host");
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }

    },
    unblockHost: async (req, res) => {
        try {
            const hostId = req.params.id;
            const host = await User.findById(hostId);
            if (!host) {
                return res.status(404).json({
                    success: false,
                    message: "Host not found"
                });
            }
            if (host.hostStatus == "active") {
                return res.status(400).json({
                    success: false,
                    message: "Host is already unblocked"

                });
            }
            host.hostStatus = "active";
            await host.save()

            res.status(200).json({
                success: true,
                message: " Host unblocked successfully",
                user: {
                    id: host._id,
                    name: host.name,
                    email: host.email,
                    role: host.role,
                    hostStatus: host.hostStatus,
                    createdAt: host.createdAt
                }
            })

        }
        catch (error) {
            console.error("Error during unblocking Host", error);
            res.status(500).json({
                success: false,
                message: "Internal Server error"
            });


        }
    },
    approveHost: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log("Approving host with ID:", userId);
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User doesnt exist"
                });
            }
            if (user.role === "host" && user.hostStatus === "active") {
                return res.status(400).json({
                    success: false,
                    message: "User is already a approved host"
                });
            }
            user.role = "host";
            user.hostStatus = "active";
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Host approved successfully",
                user,
            });


        }
        catch (error) {
            console.error("Error approving host");
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }

    },

    rejectHost: async (req, res) => {
        try {
            const userId = req.params.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User doesnt exist"
                });
            }
            if (user.role === "user" && user.hostStatus === "rejected") {
                return res.status(400).json({
                    success: false,
                    message: "User is already rejected"
                });
            }
            user.role = "user";
            user.hostStatus = "rejected";
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Host rejected successfully",
                user,
            });


        }
        catch (error) {
            console.error("Error rejecting host", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }

    },

    getAllUsers: async (req, res) => {
        try {
            // console.log("Fetching users with query:", req.query);
            const roleFilter = req.query.role;
            const hostStatusFilter = req.query.hostStatus;
            const recent = req.query.recent;

            let query = { role: { $ne: "admin" } };

            if (roleFilter) query.role = roleFilter;
            if (hostStatusFilter) query.hostStatus = hostStatusFilter;

            let queryBuilder = User.find(query, "-password").sort({ createdAt: -1 });

            if (recent === "true") {
                queryBuilder = queryBuilder.limit(5);
            }

            const users = await queryBuilder;

            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                count: users.length,

                users: users.map(user => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive,
                    hostStatus: user.hostStatus,
                    userStatus: user.userStatus,
                    createdAt: user.createdAt,
                    hostRequestedAt: user.hostRequestedAt


                }))
            });

        } catch (error) {
            console.error("Error during fetching users", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },
    getProperties: async (req, res) => {
        try {
            const statusFilter = req.query.status;
            const recent = req.query.recent;
            const query = {};
            if (statusFilter) {
                query.status = statusFilter;
            }
            let queryBuilder = Property.find(query).populate("host", "name email").sort({ createdAt: -1 });
            if (recent === "true") {
                queryBuilder = queryBuilder.limit(5);
            }
            const property = await queryBuilder;
            res.status(200).json({
                success: true,
                message: "Property fetched successfully",
                count: property.length,
                property
            });

        }
        catch (error) {
            console.error("Error fetching property:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })

        }
    },
    approveProperty: async (req, res) => {
        try {
            const propertyId = req.params.id;
            const property = await Property.findById(propertyId);
            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property not found"
                });
            }
            if (property.status == "approved") {
                return res.status(400).json({
                    success: false,
                    message: "Property approved already"
                });
            }
            property.status = "approved";
            await property.save();
            res.status(200).json({
                success: true,
                message: "Property approved",
                property
            });

        }
        catch (error) {
            console.error("Error approving property", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })

        }
    },
    rejectProperty: async (req, res) => {
        try {
            const propertyId = req.params.id;
            const property = await Property.findById(propertyId);
            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property not found"
                });
            }
            if (property.status == "rejected") {
                return res.status(404).json({
                    success: false,
                    message: "Property already rejected"
                });
            }
            property.status = "rejected";
            await property.save();
            res.status(200).json({
                success: true,
                message: "Property rejected successfully",
                property
            });

        }
        catch (error) {
            console.error("Error rejecting property", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    setCancellationPolicy: async (req, res) => {
        try {
            const { fullRefundDays, partialRefundDays, partialRefundPercent } = req.body;
            if (fullRefundDays == null || partialRefundDays == null || partialRefundPercent == null) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }
            let policy = await CancellationPolicy.findOne();
            if (policy) {
                policy.fullRefundBeforeDays = fullRefundDays,
                    policy.partialRefundBeforeDays = partialRefundDays,
                    policy.partialRefundPercent = partialRefundPercent,
                    policy.updatedBy = req.user.id;
                await policy.save();
                return res.status(200).json({
                    success: true,
                    message: "Cancellation policy updated  successfullly.",
                    policy
                });
            }
            else {
                const policy = await CancellationPolicy.create({
                    fullRefundBeforeDays: fullRefundDays,
                    partialRefundBeforeDays: partialRefundDays,
                    partialRefundPercent: partialRefundPercent,
                    updatedBy: req.user.id
                });
                return res.status(201).json({
                    success: true,
                    message: "Policy created successfully.",
                    policy
                });
            }

        }
        catch (error) {
            console.error("Policy creation error", error);
            return res.status(500).json({
                success: false,
                message: "Internal servere error"
            });

        }
    },
    getAllBookings: async (req, res) => {
        try {
            const statusFilter = req.query.status;
            const filter = {};
            if (statusFilter) {
                filter.status = statusFilter;
            }
            const bookings = await Booking.find(filter).populate("user", "name email").populate("property", "title location pricePerNight");
            if (bookings.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No bookings yet",
                    count: 0,
                    bookings: []
                });
            }
            return res.status(200).json({
                success: true,
                message: "Booking fetched successfully",
                count: bookings.length,
                bookings
            });


        }
        catch (error) {
            console.error("Error while fetching booking", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },

    adminDashboardCounts: async (req, res) => {
        try {
            const usersCount = await User.countDocuments({ role: { $ne: "admin" } });

            const hostsCount = await User.countDocuments({ role: "host" });
            const propertiesCount = await Property.countDocuments();
            const bookingsCount = await Booking.countDocuments();
            res.status(200).json({
                success: true,
                message: "Counts fetched successfully",
                counts: {
                    users: usersCount,
                    hosts: hostsCount,
                    properties: propertiesCount,
                    bookings: bookingsCount
                }
            });



        }
        catch (error) {
            console.error("Error fetching dashboard counts", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }













};