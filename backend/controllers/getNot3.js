const schedule=require('node-schedule')
const Notification=require('../models/Notification')
const asyncHandler=require("express-async-handler");
const { sendPushNotification } = require('./notificationsController');
const User=require('../models/user.Model')
const getall=asyncHandler(async(req,res)=>{
    
    const date=new Date()
    const dati=date.toISOString().split('T')[0]
    
    const allnot=await Notification.find({sendDate:dati})
    
    ;(await allnot).forEach(async(item)=>{
        const date2=new Date(item.sendDate+'T'+item.sendTime)
        
        if(date2.getTime()-date.getTime()<=1000*60*60*3&&date2.getTime()-date.getTime()>1000){
            
            const job=schedule.scheduleJob(date2,async()=>{
                const user=await User.findOne({username:item.username})
                user.deviceToken.forEach(async (nitem)=>{
                    
                    await sendPushNotification({body:{token:nitem,message:item.message,username:item.username}})
                    const id=item._id
                    const ret=await Notification.findByIdAndDelete(id)

                })
                
            })
        }
    })
})
module.exports={getall};                                                       