const asyncHandler=require("express-async-handler");
const Flight=require("../models/flights.Model")
const Staff=require("../models/staff.Model")
const Manager=require("../models/manager.Model")
const User=require('../models/user.Model')
const {hash,compare}=require('bcrypt')
const dotenv=require("dotenv").config();
const jwt=require('jsonwebtoken')
const addStaff=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    const code=await hash(password,10)
    let staff = new Staff({
        username:username,
        email:email,
        password:code,
    })
    const ans=await staff.save()
    if(ans){
        res.status(200).send({success:true,
            username:ans.username,
            email:ans.email,
        })
    }

})
const logStaff=asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    const staff=await Staff.findOne({username:username})
    if(!staff){
        return res.status(400).send({
            success:false,
            message:"User not found"
        })
       }
    const ans=await compare(password,staff.password)
    if(!ans){
        return res.status(401).send({
            success:false,
            message:"Incorrect Password"
        })
   }
   const payload={
    username:staff.username,
    id:staff._id
   }
   const token = jwt.sign(payload,process.env.Secret,{expiresIn:"12h"})
   return res.status(200).send({
    success:true,
    message:"Logged in Succesfully",
    token:"Bearer "+token
})
})
const logManager=asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    const staff=await Manager.findOne({username:username})
    if(!staff){
        return res.status(400).send({
            success:false,
            message:"User not found"
        })
       }
    const ans=await compare(password,staff.password)
    if(!ans){
        return res.status(401).send({
            success:false,
            message:"Incorrect Password"
        })
   }
   const payload={
    username:staff.username,
    id:staff._id
   }
   const token = jwt.sign(payload,process.env.Secret,{expiresIn:"12h"})
   return res.status(200).send({
    success:true,
    message:staff.username,
    token:"Bearer "+token
})

})
const managerCheck= asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    
    const manager=await Manager.findOne({username:username})
    if(!manager){
        return res.status(400).send({
            success:false,
            message:"User not found"
        })
       }
    const ans=await compare(password,manager.password)
    if(!ans){
        return res.status(401).send({
            success:false,
            message:"Incorrect Password"
        })
   }
   return res.status(200).send({success:true})

})
const managerAdd= asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    const code=await hash(password,10)
    const ans=new Manager({username:username,password:code})
    const ansi =await ans.save()
    if(ansi){
        res.status(200).send({success:true})
    }
})

const getData=asyncHandler(async(req,res)=>{

    const {username}=req.body
    const ans=await User.findOne({username:username})
    
    const fin=ans.toObject
    return res.status(200).send(Object.assign(fin,{password:''}))
})
const initialCheck= asyncHandler(async(req,res)=>{
    
    const ans=await Manager.exists({})
    if(ans){
        res.status(200).send({success:true})
    }else{
        res.status(200).send({success:false})
    }
})
module.exports={addStaff,logStaff,managerAdd,managerCheck,logManager,initialCheck,getData}