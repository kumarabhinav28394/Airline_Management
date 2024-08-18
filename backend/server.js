// console.log("I am in express server");
const express =require("express");
const dotenv=require("dotenv").config();
const router = require("./routes/backendroutes"); 
const userRouter=require('./routes/userRoutes')
const checkRouter=require('./routes/checkroute')
const Air=require('./models/airpot.Model')
const errorHandler = require("./middlewares/errorhandler");
const connectDb = require("./configure/dbConnection");
const asyncHandler=require("express-async-handler");
const User=require('./models/user.Model')
const Staff=require('./models/staff.Model')
const Razor =require('./routes/paymentroute')
const companyRouter=require('./routes/companyRoutes')
const {getall}=require('./controllers/getNot3')
const notRouter=require('./routes/notificationroute')
const cors=require('cors')
//connectDb();
connectDb();
const app=express();
const port=8080||process.env.PORT;

app.use(express.json());

app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:3001"]
    })
)
app.use("/api/contacts",router);
app.use("/api/user",userRouter)

app.get("/api/getall",asyncHandler(async(req,res,next)=>{
    const data=await Air.find({})
    res.status(200).send(data)
}))
app.post("/api/checkall",asyncHandler(async(req,res,next)=>{
    const {username,usermail}=req.body
    if(username){
    const data=await User.findOne({username:username})
    if(data){
        
        res.status(200).send({success:true}) }else{
            res.status(200).send({success:false})
        } }else{
        
        const data=await User.findOne({email:usermail})
        if(data){
        res.status(200).send({success:true}) }else{
            res.status(200).send({success:false})
        } 
    }
}))
app.post("/company/checkall",asyncHandler(async(req,res,next)=>{
    const {username,usermail}=req.body
    if(username){
    const data=await Staff.findOne({username:username})
    if(data){
        
        res.status(200).send({success:true}) }else{
            res.status(200).send({success:false})
        } }else{
        
        const data=await Staff.findOne({email:usermail})
        if(data){
        res.status(200).send({success:true}) }else{
            res.status(200).send({success:false})
        } 
    }
}))
setInterval(()=>getall(),1000*60*60*3)
app.use('/secure/payment',Razor)
app.use("/logged",checkRouter)
app.use("/api",router)
app.use('/company',companyRouter)
app.use('/notifications',notRouter)
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});