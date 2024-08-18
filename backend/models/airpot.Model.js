const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    iata:String,
    name:String,
    location:String

})
module.exports=mongoose.model("AirportID",userSchema);