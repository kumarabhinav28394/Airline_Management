// controllers/notificationsController.js
const Notification = require('../models/Notification');
const admin=require('../configure/firebaseAdmin');
const User=require('../models/user.Model')

exports.sendPushNotification = async (req, res) => {
  const { token, message,username } = req.body;

  const payload = {
    token:token,
    notification: {
      title: 'New Notification',
      body: message,
    },
  };

  try {
    await admin.messaging().send(payload);
    const data=await User.findOne({username:username})
    let arr=data.notifications
    arr.push({message:message,read:false,createdAt:new Date()})
    
    data.overwrite(Object.assign(data.toObject(),{notifications:arr}))
    await data.save()
    res.status(200).json({ message: 'Notification sent' });
  } catch (error) {
   console.log(error)
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ username: req.username }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read', error });
  }
};
exports.broadcast=async(req,res)=>{
   const {message}=req.body
  try{
    const all=await User.find({})
    all.forEach(async (user)=>{
      const dtokens=user.deviceToken
      dtokens.forEach(async(dtoken)=>{
        await this.sendPushNotification({body:{token:dtoken,message:message,username:user.username}})
      })
    })
    res.status(200).send({success:true})
  }catch(error){
    console.log(error)
  }
}
exports.sendnot=async(req,res)=>{
  const {username,message}=req.body
  try{const user=await User.findOne({username:username})
  user.deviceToken.forEach(async (dtoken)=>{
    await this.sendPushNotification({body:{token:dtoken,message:message,username:username}})
  })
  res.status(200).send({success:true})}
  catch(error){
    console.log(error)
  }
}