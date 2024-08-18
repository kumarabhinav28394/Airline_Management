import React from 'react'
import staff from './staff.jpg'
import user from './user.jpg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import api from '../API/api.js'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [userName,setUserName]=useState('')
    const [userPass,setUserPass]=useState('')
    const [ispop6,setIspop6]=useState(false)
    const [mann,setMann]=useState('')
    const [manp,setManp]=useState('')
    const [isFocusp, setIsFocusp] = useState(false);  
    const navigate=useNavigate()
    const input1=useRef()
    const input2=useRef()
    const check=()=>{
      api.get('/company/initialize').then((res)=>{if(!res.data.success){setIspop6(true)}})
        const token = localStorage.getItem('token')
        if (!token) {
          navigate("/")
        } else {
          api.get('/logged/manager', {
            headers: {
              Authorization: token
            }
          }).then(res => {
           
            if (res.data.success) {
              console.log('hi')
              navigate('/Home')
                
    
            } else {
              api.get('/logged/company/staff', {
                headers: {
                  Authorization: token
                }
              }).then(res => {
               
                if (res.data.success) {
                  
                  navigate('/Home')
                    
        
                } else {
                  localStorage.removeItem('token')
                  navigate("/")
        
                }
              }).catch((err) => {
                localStorage.removeItem('token')
                navigate("/")
        
              })
    
            }
          }).catch((err) => {
            api.get('/logged/company/staff', {
              headers: {
                Authorization: token
              }
            }).then(res => {
             
              if (res.data.success) {
                
                navigate('/Home')
                  
      
              } else {
                localStorage.removeItem('token')
                navigate("/")
      
              }
            }).catch((err) => {
              localStorage.removeItem('token')
              navigate("/")
      
            })
          })
          
        }
      }
      useEffect(() => check(), [])
    const handleChange=(e,s)=>{
      if(s==='n'){
        setUserName(e.target.value)
      }
      if(s==='p'){
        setUserPass(e.target.value)
      }
  
  
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      api.post('/company/managerlog',{
          username:userName,
          password:userPass
      },{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((user)=>{
        console.log(user.data.message)
        localStorage.setItem('token',user.data.token)
        navigate("/Home")
        
      }).catch(err=>{
        
        api.post('/company/log',{
          username:userName,
          password:userPass
      },{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((user2)=>{
        console.log(user2)
        localStorage.setItem('token',user2.data.token)
        navigate("/Home")
        
      }).catch(err=>window.alert('Something went wrong! Try again with correct credentials'))
      })
    
      
      
         
}
  return (
    <>
    {ispop6&&<div className=' flex z-20 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
    <div className='bg-white w-[30vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[55vh]'>
    <h1 className='text-xl self-start font-semibold'>Hello! Since This is site initialization . I Need a Manager</h1>
    <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Manager Username </label>
        <input type='text' value={mann} onChange={(e)=>{setMann(e.target.value)}} className='w-72 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
        <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Password</label>
        <input type='text'value={manp} onChange={(e)=>{setManp(e.target.value)}} className='w-72 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
       
       <div  className='flex flex-row ml-28 w-full h-14'><button onClick={()=>{api.post('/company/initialize/add',{username:mann,password:manp}).then(()=>{window.alert('Manager Added Successfully');setIspop6(false)})}} className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Submit</button>
      

       </div>
      </div>
      </div>}
    <div className="h-screen w-full bg-gradient-to-r from-purple-500 to-pink-500 flex flex-row items-center justify-center ">
      <div className="h-[75vh] w-[70vw] bg-white rounded-[2rem] shadow-2xl shadow-black flex  p-3">
          <img src={staff} className='h-full w-[28rem] rounded-l-3xl'/>
          <form onSubmit={(e)=>handleSubmit(e)} className='h-full w-[22rem] ml-28 rounded-r-3xl flex flex-col justify-center items-center '>
                <h1 className=' text-5xl mb-7'>Login!</h1>
                <img src={user} className='rounded-full h-20 w-20 mb-8'/>
                <div className='flex flex-col h-16 mb-4 justify-center items-center'>
                <label onClick={()=>{input1.current.focus()}} className={`absolute z-10 ml-6 p-1 self-start transition-translate duration-300 ease-in-out transform ${isFocus||userName ? 'ml-4 mb-10  bg-white  text-xs':''}`}>User Name</label>
                <input ref={input1} value={userName} onChange={(e)=>{handleChange(e,'n')}} className=' relative p-1 border-2 border-gray-500 rounded-lg h-10 w-[22rem]' onFocus={()=>{setIsFocus(true)}} onBlur={()=>{setIsFocus(false)}}></input>
                </div>
                <div className='flex flex-col mb-2 h-16 justify-center items-center'>
                <label onClick={()=>{input2.current.focus()}} className={`absolute z-10 ml-6 p-1 self-start transition-translate duration-300 ease-in-out transform ${isFocusp||userPass ? 'ml-4  bg-white mb-10 text-xs':''}`}>Enter password</label>
                <input ref={input2} type='password' value={userPass} onChange={(e)=>{handleChange(e,'p')}} className=' relative p-1 border-2 border-gray-500 rounded-lg h-10 w-[22rem]' onFocus={()=>{setIsFocusp(true)}} onBlur={()=>{setIsFocusp(false)}}></input>
                </div> 
                <button type='submit' className='w-28 text-white mt-3 self-center mb-2 bg-blue-700 h-10 rounded-3xl hover:scale-110 hover:bg-brightness-75 ' >Login</button>
       
          </form>
      </div>
    </div>
    </>
  )
}

export default Login
