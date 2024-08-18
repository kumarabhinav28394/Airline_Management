//const DummyFlight=require('../models/payment.Model');
const express = require('express');
const axios = require('axios');
const Razorpay = require('razorpay');
const Payment = require('../models/payment.Model');
const asyncHandler = require('express-async-handler');
// const key_id=rzp_test_dWGuTHp9rBWXeX;
// const key_secret=ijARnHi4vaErhE5IlSc7ATMD;
const crypto=require('crypto');
const router = express.Router();
const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
  });

  router.post('/order',asyncHandler( async (req, res) => {
    const { amount, currency,notes } = req.body;
    try {
      const options = {
        amount: Number(amount * 100), // amount in the smallest currency unit
        currency,
        receipt:crypto.randomBytes(10).toString("hex"),
        notes,
    
      };
     
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  }));

  router.post('/success', asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const newPayment = new Payment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });
    try {
      await newPayment.save();
      res.json({ message: 'Payment successful' });
    } catch (error) {
      res.status(480).send(error);
    }
  }));
  console.log("payment");

  module.exports = router;