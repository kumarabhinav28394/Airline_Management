const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    username:String,
    flightDetails: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"TravelHistory"
    },
    feedback: {
        rating: { type: Number, min: 1, max: 5, required: true },
        comments:String,
    }
    
},{timestamps:true});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
