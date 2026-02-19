const cron=require("node-cron");
const Booking=require("../models/bookingModel");
 cron.schedule("*/2 * * * *",async()=>{
    console.log("Running booking cleanup job....");
    
    await Booking.deleteMany({
        status:"pending",
        expiresAt:{$lt:new Date()}   ///deletes if expiresAt of the booking is lessthan the current time
    });
 })
