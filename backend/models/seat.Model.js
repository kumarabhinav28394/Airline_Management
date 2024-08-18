const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    seatId:Number,
    seatClass:String,
    seats:Array
},{timestamps:true})
module.exports=mongoose.model("seatmatrixe",userSchema);