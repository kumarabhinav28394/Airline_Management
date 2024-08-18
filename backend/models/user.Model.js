const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        
    },name:{
        type:String,
        required:false,
        unique:false,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:false,
    },
    travellers:{
        type:Array,
        required:false,
        unique:false,
    },gender:{
        type:String,
        required:false,
        unique:false,
        
    },
    number:{
        type:String,
        required:false,
        unique:false,
    },pincode:{
        type:String,
        required:false,
        unique:false,
    },
    birthday:{
        type:String,
        required:false,
        unique:false,
    },state:{
        type:String,
        required:false,
        unique:false,
        
    },
    address:{
        type:String,
        required:false,
        unique:false,
    },image:String,
    deviceToken:{
        type:Array
    },notifications:Array
},{timestamps:false});

module.exports=mongoose.model("User",userSchema);