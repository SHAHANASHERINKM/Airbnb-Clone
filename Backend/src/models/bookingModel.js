const mongoose=require("mongoose");
const { checkout } = require("../routes/user.routes");
const Schema=mongoose.Schema;

const bookingSchema=new Schema({
    property:{
        type:Schema.Types.ObjectId,
        ref:"Property",
        required:true

    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    host:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    guests:{
        type:Number,
        required:true
    },
    pricePerNight:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled","completed"],
        default:"pending"
    },
    paymentStatus:{
        type:String,
        enum:["pending","paid","failed","refunded"],
        default:"pending"
    },
    expiresAt:{type:Date}

},{timestamps:true});
module.exports=mongoose.model("Booking",bookingSchema);