// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  username:String,
  message: { type: String},
  sendDate:String,
  sendTime:String
});

module.exports = mongoose.model('Notification', notificationSchema);
