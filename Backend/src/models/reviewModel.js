const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const reviewSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    property:{
        type:Schema.Types.ObjectId,
        ref:"Property",
        required:true
    },
    booking:{
        type:Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    commnt:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("Review",reviewSchema);