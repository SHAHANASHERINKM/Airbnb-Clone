const cron=require("node-cron");
const Booking=require("../models/bookingModel");
 cron.schedule("0 0 * * *",async()=>{
    console.log("Running booking completion job...");
    try{
        const today=new Date();
        const result=await Booking.updateMany({
            status:"confirmed",
            checkOut:{$lt:today}
        },
        {status:"completed"}
    );
    console.log("Bookingd marked as completed",result.modifiedCount);


    }
    catch(error){
        console.log("Cron job error:",error);
        

    }

 }
)