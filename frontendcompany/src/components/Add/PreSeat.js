import React from 'react'
import { useState,useRef } from 'react';
const PreSeat = ({ind,list,setList,number,price,j}) => {
    const [booked,setBooked]=useState(false)
const [ispop3,setIspop3]=useState(false)
const box=useRef()
const butt = useRef()
 const bookbox=useRef()
 const sub=()=>{
    
    const data={
        seatNumber:number,
        price:price,
        isAvailable:!bookbox.current.checked
    }
    const arr=list;
    arr[ind]=data
    setList(arr)

if(bookbox.current.checked){
        butt.current.classList='bg-red-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
    }else{
        butt.current.classList=j+ ' w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'

    }

}
  return (
    <div>
        {ispop3&&<div onClick={(e) => {const r=box.current; if (!(e.target===box.current||r.contains(e.target))) { setIspop3(false) } }} className=' flex z-20 fixed h-screen w-screen bg-black bg-opacity-20 top-0 left-0 items-center justify-center'>
    <div ref={box} className='bg-white w-[30vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[55vh]'>
    <h1 className='text-2xl self-start font-semibold'>Set Details</h1>
    <div className='flex mt-4 h-24 flex-col p-1'>
<label className='font-semibold'>Booked</label>
        <input type='checkbox' ref={bookbox} className='w-72 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
       <div className='flex flex-row ml-28 w-full h-14'><button onClick={()=>{setBooked(bookbox.current.checked);sub();setIspop3(false)}} className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Submit</button>
       <button onClick={()=>setIspop3(false)} className='w-28 h-10 bg-white ml-14 text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>

       </div>
      </div>
      </div>}
      <button ref={butt} onClick={() => setIspop3(true)} className={`${j} w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10`} key={ind}>{number}</button>

    </div>
  )
}

export default PreSeat
