import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import api from '../API/api'
import Seat from './Seat'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import PreSeat from './PreSeat'
const UpdateSeats = () => {
    const {id}=useParams()
    const [seats,setSeats]=useState([])
    const [list,setList]=useState([])
    const [premprice,setPremprice]=useState()
    const [busiprice,setBusiprice]=useState()
    const navigate=useNavigate()
    const [premium,setPremium]=useState('')
    const check=()=>{
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
              
              
                
    
            } else {
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
    useEffect(()=>{
        check()
        api.post("/api/seats",{id:id}).then((res)=>{console.log(res.data);if(res.data.success){setSeats(res.data.seats);setList(res.data.seats);setPremium(res.data.type)}}).catch((err)=>console.log(err))

    },[])
    const renderList=()=>{
        const listItems = [];
            
           console.log(list) 
            seats.map((item,index) => {
                    if(premium==='premium'){
                      if((item.seatNumber.charAt(0)==='1'||item.seatNumber.charAt(0)==='2')&&item.seatNumber.length==2){
                        if(['A','C','D','F'].includes(item.seatNumber.charAt(1))){
                            listItems.push(<PreSeat ind={index} number={item.seatNumber} list={list} setList={setList} price={busiprice} j={'bg-yellow-500'}/>)
                            if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                        }else{
                            listItems.push(<div className='w-10 h-10'></div>)
                        }
                    }else if((item.seatNumber.charAt(0)==='3'||item.seatNumber.charAt(0)==='4'||item.seatNumber.charAt(0)==='5')&&item.seatNumber.length==2){
                        listItems.push(<PreSeat ind={index} number={item.seatNumber} list={list} setList={setList} price={premprice} j={'bg-blue-700'}/>)
                            if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                    }else{
                        listItems.push(<Seat ind={index} number={item.seatNumber} list={list} setList={setList} />)
                if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                    }
                    }else{
                    listItems.push(<Seat ind={index} number={item.seatNumber} list={list} setList={setList} />)
                    if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                    }
                
            })
        
        return listItems;
    }
   const handleSubmit=()=>{
    api.post('/api/addseats',{id:id,type:premium,seatarr:list }).then(()=>{navigate('/Home')}).catch((err)=>{console.log(err)})
   }
  return (
    <><Navbar/>
    <div className='h-[4.2rem]'></div>
    <div className='flex flex-col bg-gradient-to-r p-10 from-purple-500 to-pink-500 items-center justify-center'>
        <div className='bg-gradient-to-r from-pink-500 to-blue-500 flex flex-col items-center mt-auto mb-auto border-2 border-solid border-gray-300 justify-center rounded-md'>
            <div className=' border-solid  border-gray-300 text-white border-b-2 px-3 pt-1 h-10 w-full text-xl'>Seat Selection</div>
            <div className='flex bg-white flex-col p-6 py-3 items-center justify-center w-[70vw]'>
                <h1 className='text-2xl font-semibold ml-[28vw] self-start'>Select Seat Details</h1>
                <div className=' mt-8 grid-cols-7 gap-2 w-[24vw] grid'>
                    {renderList()}
                </div>
                <button onClick={()=>handleSubmit()} className='p-1 px-2 rounded-lg bg-blue-500 mt-3 hover:brightness-75'>Submit</button>
            </div></div></div>
            </>
  )
}

export default UpdateSeats
