const express =require("express");
const{checkUser,checkStaff,checkManager}=require("../controllers/checker");
const User=require('../models/user.Model')
const asyncHandler=require("express-async-handler");
const router=express.Router();
router.route("/").get(checkUser)
router.route("/company/staff").get(checkStaff)
router.route("/manager").get(checkManager)
module.exports=router;