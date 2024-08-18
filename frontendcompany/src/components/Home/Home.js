import React from 'react'
import add from './Designer.png'
import update from './update.png'
import user from './image.png'
import api from '../API/api'
import notify from './notify.png'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Navbar from '../Navbar/Navbar'
const Home = () => {
  const [ispop6,setIspop6]=useState(false)
    const [mann,setMann]=useState('')
    const [ismanager,setIsmanager]=useState(false)
    const [manp,setManp]=useState('') 
    const navigate=useNavigate()
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
            console.log('heloi')
            if (res.data.success) {
              console.log('hi')
             setIsmanager(true)
               return 
    
            }else {
              console.log('hello')
              api.get('/logged/company/staff', {
                headers: {
                  Authorization: token
                }
              }).then(res => {
               
                if (res.data.success) {
                  
                  
                    
        
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
    <Navbar/>
    <div className='h-[4.2rem]'></div>
    <div className='bg-gradient-to-r justify-center items-center from-purple-500 to-pink-500 flex flex-col w-screen h-auto'>
    <div className='flex flex-row w-screen justify-center items-center'>
    <Link to='/add'><div className='w-96 h-[55vh] mt-10 rounded-lg bg-white block hover:scale-105 hover:brightness-90 cursor-pointer p-5 transition-all duration-300 ease-in-out'><img src={user} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>Add Staff</div><div className='text-red-500 font-semibold'>Only For Managers*<br/>Login with a manager id required!</div></div></Link> 
    <Link to='/notify'><div className='w-96 h-[55vh] mt-10 ml-20 rounded-lg bg-white block hover:scale-105 hover:brightness-90 cursor-pointer p-5 transition-all duration-300 ease-in-out'><img src={notify} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>Notifications</div></div></Link> 
    </div>
    <div className='flex flex-row w-screen justify-center items-center'>
     <Link to='/addf'><div className='w-96 h-[55vh] rounded-lg bg-white m-10 hover:scale-105 hover:brightness-90 cursor-pointer p-8 transition-all duration-300 ease-in-out'><img src={add} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>Add Flight</div></div></Link> 
     <Link to='/updatef'><div className='w-96 h-[55vh] bg-white rounded-lg m-10 hover:scale-105 hover:brightness-90 cursor-pointer p-8 transition-all duration-300 ease-in-out'><img src={update} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>Update Flight</div></div></Link>
     <Link to='/usercheck'><div className='w-96 h-[55vh] bg-white rounded-lg m-10 hover:scale-105 hover:brightness-90 cursor-pointer p-8 transition-all duration-300 ease-in-out'><img src={user} className='w-80 rounded-lg h-[35vh]'/><div className='flex flex-row justify-center mt-10 items-center text-2xl font font-semibold'>Check User</div></div></Link>
     </div>
    </div>
    </>
  )
}

export default Home
