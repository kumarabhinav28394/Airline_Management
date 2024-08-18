const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//     passenger: {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     flightDetails: {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"TravelHistory"
//     },
//     paymentDetails: {
//         amount: { type: Number, required: true },
//         currency: { type: String, required: true },
//         paymentMethod: { type: String, required: true },
//         transactionId: { type: String, required: true, unique: true },
//         paymentDate: { type: Date, default: Date.now },
//         paymentStatus: {
//             type: String,
//             enum: ["Pending", "Completed", "Failed"],
//             default: "Pending"
//         }
//     }
// },{timestamps:true});

// const Payment = mongoose.model("Payment", paymentSchema);

const paymentSchema = new mongoose.Schema({
    orderId: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    signature: {
      type: String,
      required: true
    }
  });


  module.exports = mongoose.model('Payment', paymentSchema);
