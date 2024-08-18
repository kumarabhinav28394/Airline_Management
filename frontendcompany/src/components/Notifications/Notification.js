import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import api from '../API/api'
import onenot from './onenot.png'
import broad from './broad.jpeg'
const Notification = () => {
    const [ispop5,setIspop5]=useState(false)
    const [ispop6,setIspop6]=useState(false)
    const [bmess,setBmess]=useState('')
    const [mess,setMess]=useState('')
    const [username,setUserName]=useState('')
    const handlebroad=()=>{
        api.post('/notifications/broadcast',{message:bmess}).then(()=>{window.alert('Message Broadcasted Successfully');setIspop5(false)}).catch((err)=>{console.log(err)})
    }
    const handleone=()=>{
        api.post('./notifications/send',{message:mess,username:username}).then(()=>{window.alert('Message Sent to '+username);setIspop6(false)}).catch((err)=>{console.log(err)})
    }
  return (
    <div className=''>
        {ispop5&&<div className=' flex z-20 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
    <div className='bg-white w-[40vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[30vh]'>
    <h1 className='text-xl self-start font-semibold'>BroadCast A Notification</h1>
    <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Message </label>
        <textarea value={bmess} onChange={(e)=>{setBmess(e.target.value)}} className='w-72 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
       <div  className='flex flex-row ml-28 w-full h-14'><button onClick={()=>{handlebroad()}} className='w-28 h-10 bg-blue-700 ml-24 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Submit</button>
       <button onClick={()=>setIspop5(false)} className='w-28 h-10 bg-white text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>
       </div>
      </div>
      </div>}
      {ispop6&&<div className=' flex z-20 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
    <div className='bg-white w-[40vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[55vh]'>
    <h1 className='text-xl self-start font-semibold'>Send Notification to A Particular User</h1>
    <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Username </label>
        <input type='text' value={username} onChange={(e)=>{setUserName(e.target.value)}} className='w-72 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
        <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Message</label>
        <input type='text'value={mess} onChange={(e)=>{setMess(e.target.value)}} className='w-72 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
       
       <div  className='flex flex-row ml-28 w-full h-14'><button onClick={()=>{handleone()}} className='w-28 ml-24 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Submit</button>
       <button onClick={()=>setIspop6(false)} className='w-28 h-10 bg-white text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>


       </div>
      </div>
      </div>}
      <Navbar/>
    <div className='h-[4.2rem]'></div>
    <div className='bg-gradient-to-r justify-center items-center from-purple-500 to-pink-500 flex flex-col w-screen h-screen'>
    <div className='flex flex-row w-screen justify-center items-center'>
     <div onClick={()=>{setIspop5(true)}} className='w-96 h-[55vh] rounded-lg bg-white m-10 hover:scale-105 hover:brightness-90 cursor-pointer p-8 transition-all duration-300 ease-in-out'><img src={broad} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>BroadCast Notification</div></div>
     <div onClick={()=>{setIspop6(true)}} className='w-96 h-[55vh] bg-white rounded-lg m-10 hover:scale-105 hover:brightness-90 cursor-pointer p-8 transition-all duration-300 ease-in-out'><img src={onenot} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>Send Notification </div></div>
     </div>
    </div>
    </div>
  )
}

export default Notification
