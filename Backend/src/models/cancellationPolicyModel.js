const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const cancellationSchema=new Schema({
    fullRefundBeforeDays:{
        type:Number,
        required:true,
        default:2
    },
    partialRefundBeforeDays:{
        type:Number,
        required:true,
        default:1
    },
    partialRefundPercent:{
        type:Number,
        required:true,
        default:50
    },
    updatedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{timestamps:true});
module.exports=mongoose.model("CancellationPolicy",cancellationSchema)