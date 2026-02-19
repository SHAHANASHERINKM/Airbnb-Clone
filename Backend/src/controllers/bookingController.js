const Booking = require("../models/bookingModel");
const Property = require("../models/propertyModel");
const Policy = require("../models/cancellationPolicyModel");


module.exports = {
    checkAvailabilty: async (req, res) => {
        try {
            const { propertyId, checkIn, checkOut } = req.body;

            if (!propertyId || !checkIn || !checkOut) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);

            //  Check booking conflict
            const bookingConflict = await Booking.find({
                property: propertyId,
                status: { $in: ["pending", "confirmed"] },
                checkIn: { $lt: checkOutDate },
                checkOut: { $gt: checkInDate }
            });

            //  Get property blocked dates
            const property = await Property.findById(propertyId);

            let blockedConflict = false;

            if (property && property.blockedDate && property.blockedDate.length > 0) {
                for (let block of property.blockedDate) {
                    if (block.startDate < checkOutDate && block.endDate > checkInDate) {
                        blockedConflict = true;
                        break;
                    }
                }
            }

            //  Final conflict check
            if (bookingConflict.length > 0 || blockedConflict) {
                return res.json({
                    available: false,
                    message: "Dates not available (booked or blocked)"
                });
            }

            return res.status(200).json({
                available: true,
                message: "Dates available"
            });

        } catch (error) {
            console.error("Error checking availability", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },
    createBooking: async (req, res) => {
        try {
            const { propertyId, checkIn, checkOut, guests } = req.body;
            if (!propertyId || !checkIn || !checkOut || !guests) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }
            const property = await Property.findById(propertyId);
            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: "Property not found"
                });
            }
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);

            //  Check booking conflict
            const bookingConflict = await Booking.find({
                property: propertyId,
                status: { $in: ["pending", "confirmed"] },
                checkIn: { $lt: checkOutDate },
                checkOut: { $gt: checkInDate }
            });

            //  Get property blocked dates


            let blockedConflict = false;

            if (property && property.blockedDate && property.blockedDate.length > 0) {
                for (let block of property.blockedDate) {
                    if (block.startDate < checkOutDate && block.endDate > checkInDate) {
                        blockedConflict = true;
                        break;
                    }
                }
            }

            //  Final conflict check
            if (bookingConflict.length > 0 || blockedConflict) {
                return res.json({
                    available: false,
                    message: "Dates not available (booked or blocked)"
                });
            }
            const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
            if (nights <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid dates"
                });
            }
            const totalPrice = nights * property.pricePerNight;
            const booking = await Booking.create({
                property: propertyId,
                user: req.user.id,
                host: property.host,
                checkIn,
                checkOut,
                guests,
                pricePerNight: property.pricePerNight,
                totalPrice,
                status: "pending",
                paymentStatus: "pending",
                expiresAt: Date.now() + 15 * 60 * 1000

            });
            res.status(201).json({
                message: "Booking created,complete payment to confirm",
                booking
            });

        }
        catch (error) {
            console.error("Error creating booking", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    fakePayment: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({
                    success: true,
                    message: 'Booking not found'
                });
            }
            if(booking.paymentStatus==="paid"){
                return res.status(400).json({
                    success:false,
                    message:"Already paid"
                });
            }
            booking.status = "confirmed";
            booking.paymentStatus = "paid";
            booking.expiresAt = null;
            await booking.save();
            res.json({
                message: "Payment successful",
                booking
            });
        }
        catch (error) {
            console.error("Error during payment", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }

    },
    cancelBooking: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }
            if (booking.status == "cancelled") {
                return res.status(400).json({
                    success: false,
                    message: "Booking is already canceled"
                });
            }

            const policy = await Policy.findOne();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const checkInDate = new Date(booking.checkIn);
            // convert to YYYY-MM-DD first to ignore time and timezone
            const checkInString = checkInDate.toISOString().split('T')[0];
            const checkIn = new Date(checkInString);

            const diffMs = checkIn - today;
            const daysLeft = diffMs / (1000 * 60 * 60 * 24);

            console.log(daysLeft);

            if (daysLeft <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Sorry,You can not cancel booking after checkin"
                });
            }
            let refundPercent = 0;
            if (daysLeft >= policy.fullRefundBeforeDays) {
                refundPercent = 100;

            }
            else if (daysLeft >= policy.partialRefundBeforeDays) {
                refundPercent = policy.partialRefundPercent;
            }

            const refundAmount = booking.totalPrice * (refundPercent / 100);
            booking.status = "cancelled";
            await booking.save();
            return res.status(200).json({
                success: true,
                message: "Booking canceled",
                refundAmount
            })

        }
        catch (error) {
            console.error("Error cancelling booking");
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },
    getCancellationPolicy:async(req,res)=>{
        try{
            const policy=await Policy.findOne();
            if(!policy){
                return res.status(404).json({
                    success:false,
                    message:"No cancellation  policy found"
                });
            }
            return res.status(200).json({
                success:true,
                policy
            })

        }
        catch(error){
            console.error("Error fetching policy",error);
            res.status(500).json({
                success:false,
                message:"Internal server error"
            });

        }

    },

    getSinlgeBooking:async(req,res)=>{
        try{
            const userId=req.user.id;
            const bookingId=req.params.id;
            const booking=await Booking.findById(bookingId).populate("property");
            if(!booking){
                return res.status(404).json({
                    success:false,
                    message:"Booking not found"
                });
            }
           
            if(booking.user.toString() !== userId.toString()){
                return res.status(403).json({
                    success:false,
                    message:"Unauthorised"
                })
            }
            return res.status(200).json({
                success:true,
                message:"Booking fetched successfully",
                booking
            });

        }
        catch(error){
            console.error("Error fetching booking",error);
            res.status(500).json({
                success:false,
                message:"Internal server error"
            });

        }
    }






}