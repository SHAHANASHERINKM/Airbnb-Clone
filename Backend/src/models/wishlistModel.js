const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const wishlistSchema=new Schema({
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

},{timestamps:true});
wishlistSchema.index({ user: 1, property: 1 }, { unique: true });

module.exports=mongoose.model("WishList",wishlistSchema);