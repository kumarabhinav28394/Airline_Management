//@ get all contacts
//@route get/api/contacts
//@access public
const asyncHandler=require("express-async-handler");
//automatic execute try catch block as middle ware for error handling

//Importing Mongoose model
const User=require("../models/user.Model");
const Users=User.find();
const Seat=require("../models/seat.Model")
const Flight=require("../models/flights.Model")
const Travel=require('../models/Travelhistory.Model')
const Notification=require('../models/Notification')
const Feeedback=require('../models/feedback.Model')
const getUsers=asyncHandler(async(req,res)=>{
    res.status(200).json({message:"Get all contacts"});
});
//@create contact

//@ modify contact
const getUser=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`});
});
//update contact
const updateUser=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Update contacts ${req.params.id}`});
});
//delete contact
const deleteUser=async(req,res)=>{
    res.status(200).json({message:`Delete contacts for ${req.params.id}`});
}

const seatCheck=asyncHandler(async(req,res)=>{

    const {id}=req.body
   
    const seat=await Seat.findOne({seatId:id})
    if(seat){
        return res.status(200).send({success:true,
            seats:seat.seats,
            type:seat.seatClass
        })
    }
})
const getFlight=asyncHandler(async(req,res)=>{
    let {id}=req.body
    const flight=await Flight.findOne({flight_id:id})
   
    if(flight){
        const rek=flight.toObject()
        const fin=Object.assign({success:true},rek)
        return res.status(200).send(fin)
    }else{
        const rek=flight.toObject()
        const fin=Object.assign(rek,{success:false})
        return res.status(200).send(fin)
    }
})
const setFlight=asyncHandler(async(req,res)=>{
    const data=req.body
    
    
    const ansi=await Flight.findOne({flight_id:data.flight_id})
    
    if(ansi){
        const ratings=ansi.ratings
        const reviews=ansi.reviews
         ansi.overwrite(Object.assign(data,{ratings:ratings,reviews:reviews}))
         const yes=await ansi.save()
        return res.status(200).send({success:true})
        
    }else{
        const data1=Object.assign(data,{ratings:0,reviews:[]})
        const flight=new Flight(data1)
   const ans =await flight.save()
   
   return res.status(200).send({id:data.flight_id})}
})
const addSeats=asyncHandler(async(req,res)=>{
    const {id,type,seatarr}=req.body
    
    const seat=new Seat({
        seatId:id,
        seatClass:type,
        seats:seatarr
    })
    const ansi=await Seat.findOne({seatId:id})
    if(ansi){
        ansi.overwrite({seatId:id,
            seatClass:type,
            seats:seatarr})
            const yes=await ansi.save()
            return res.status(200).send({success:true})
    }else{
    const ans=seat.save()
        if(ans){
           return res.status(200).send({success:true})
        }}
    
})
const getAllFlight=asyncHandler(async(req,res)=>{
           const {from,to,date,premium}=req.body
           
            let all=[]
            if(premium){
             all=await Flight.find({from:from,to:to,dept_date:date,premium:premium})}
             else{
                all=await Flight.find({from:from,to:to,dept_date:date})
             }
            if(all){
                
                
                res.status(200).send({success:true,arr:all})
            }else{
                res.status(404).send({success:false})
            }
})
const setTravel=asyncHandler(async(req,res)=>{
    const ndata=req.body
    let dt=new Date()
    const data=Object.assign(ndata,{bookingDate:dt.toISOString().split('T')[0]})
   
    const sub=new Travel(data)
    const ans=await sub.save()
    let dt1=new Date(sub.flightDetails.departure_date+'T'+sub.flightDetails.departure_time)
    dt1.setDate(dt1.getDate()-1)
    const it=new Notification({username:data.username,message:"Your flight is in 24 hrs get ready.",sendDate:dt1.toISOString().split('T')[0],sendTime:dt1.toISOString().split('T')[1]})
    await it.save()
    let dt2=new Date(sub.flightDetails.departure_date+'T'+sub.flightDetails.departure_time)
    dt2.setTime(dt2.getTime()-1000*60*60*3)
    const it2=new Notification({username:data.username,message:"Your flight is in 3 hrs get ready.",sendDate:dt2.toISOString().split('T')[0],sendTime:dt2.toISOString().split('T')[1]})
    await it2.save()
    let dt3=new Date(sub.flightDetails.departure_date+'T'+sub.flightDetails.departure_time)
    dt3.setTime(dt3.getTime()-1000*60*60)
    const it3=new Notification({username:data.username,message:"Your flight is in 1 hr get ready.",sendDate:dt3.toISOString().split('T')[0],sendTime:dt3.toISOString().split('T')[1]})
    await it3.save()
    
    if(ans){
        return res.status(200).send({success:true})
    }

})
const addrating=asyncHandler(async(req,res)=>{
    const {id,rating,review}=req.body
    
    const ans=await Flight.findOne({flight_id:id})
   
    
    const nratings=((ans.ratings)*(ans.reviews.length)+rating)/(ans.reviews.length+1)
    const nreviews=ans.reviews
    nreviews.push(review)
    const data=ans.toObject()
    const fini=Object.assign(data,{ratings:nratings,reviews:nreviews})
    const ofin=ans.overwrite(data)
    const fin =await ans.save()
    const ans2=await Travel.find({username:review.username})
    
    let ans3={}
    ans2.forEach(async(item)=>{
        if(item.flightDetails.flight_number==id){
            
          
            let obji=item.toObject()
            const far=await Travel.findByIdAndDelete(item._id)
            if(obji.feedback){
                let yarr=obji.feedback
                yarr.push({rating:rating,review:review})
                ans3=Object.assign(obji,{feedback:yarr})
            let far3=new Travel(ans3)
            let far4=far3.save()
           

            }else{
                yarr=[{rating:rating,review:review}]
                ans3=Object.assign(obji,{feedback:yarr})
            let far3=new Travel(ans3)
            let far4=far3.save()
            
            }
            
             
        }else{
            
        }
    })
    return res.status(200).send({success:true})  
    

})

module.exports={getUsers,addrating,getAllFlight,setTravel,addSeats,setFlight,getFlight,getUser,updateUser,seatCheck,deleteUser};