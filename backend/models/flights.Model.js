const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    flight_name:String,
    flight_id:Number,
    dept_time:String,
    dept_date:String,
    duration:String,
    price:Number,
    premprice:Number,
    busiprice:Number,
    from:String,
    to:String,
    premium:Boolean,
    image:String,
    arr_time:String,
    arr_date:String,
    seatRows:Number,
    fromTitle:String,
    toTitle:String,
    ratings:Number,
    reviews:Array

})
module.exports=mongoose.model("flightindexe",userSchema);