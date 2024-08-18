const express =require("express");

const router=express.Router();
const{createUser,markRead,getTravel,checkUser,upPass,gettraveller,imgup,upUser}=require("../controllers/userController");
router.route("/register").post(createUser);
router.route("/login").post(checkUser)
router.route("/image").post(imgup)
router.route('/update').post(upUser)
router.route('/update/pass').post(upPass)
router.route('/gettravel').post(getTravel)
router.route('/travellers/get').post(gettraveller)
router.route('/markread').post(markRead)
// router.route("/user/:id").put(updateUser).get(getUser).delete(deleteUser);
module.exports=router;
// router.post("/register",(req,res)=>{
//     let user=new UserModel({
//         username : req.body.username,
//         password : req.body.password
    
// })
//     user.save()
//     res.send({success : true})});



// router.post("/login",(req,res)=>{
//     res.json({message:"Current user information"});

// });
// router.post("/current",(req,res)=>{
//     res.json({message:"Register the User "});

// });
