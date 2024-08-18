const mongoose = require("mongoose");

const travelHistorySchema = new mongoose.Schema({
    username:String,
    passengers: Array,
    flightDetails: Object,
    bookingDate: String,
    paymentDetails: Object,
    feedback:Array
});

module.exports=mongoose.model("travelhistorie",travelHistorySchema);