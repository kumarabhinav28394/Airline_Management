import React, { useEffect, useState } from 'react'
import Seat from './Seat'
import PreSeat from './PreSeat'
const Seats = ({row,list,setList,premium,premprice,busiprice,handleSubmit}) => {
    
    const [list1,setList1]=useState([])
    
    useEffect(()=>{
        const lis=[];
        for(let i=1;i<=row;i++){
            const cha=['A','B','C','D','E','F']
            cha.forEach((item)=>{
                if(premium){
                    if((i===1||i===2)){
                        lis.push({
                            seatNumber:i.toString()+item,
                            price:0,
                            isAvailable:true
                        })
                    }else if(i==3||i==4||i==5){
                        lis.push({
                            seatNumber:i.toString()+item,
                            price:0,
                            isAvailable:true
                        })
                    }else{
                        lis.push({
                            seatNumber:i.toString()+item,
                            price:0,
                            isAvailable:true
                        })
                    }
                }else{
                lis.push({
                    seatNumber:i.toString()+item,
                    price:0,
                    isAvailable:true
                })}
            })
        }
        setList(lis)
        setList1(lis)
    },[])
    const renderList=()=>{
        const listItems = [];
       
           console.log(list) 
            list1.map((item,index) => {
                    if(premium){
                        if((item.seatNumber.charAt(0)==='1'||item.seatNumber.charAt(0)==='2')&&item.seatNumber.length==2){
                            if(['A','C','D','F'].includes(item.seatNumber.charAt(1))){
                                listItems.push(<PreSeat ind={index} number={item.seatNumber} list={list} setList={setList} price={0} j={'bg-yellow-500'}/>)
                                if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                            }else{
                                listItems.push(<div className='w-10 h-10'></div>)
                            }
                        }else if((item.seatNumber.charAt(0)==='3'||item.seatNumber.charAt(0)==='4'||item.seatNumber.charAt(0)==='5')&&item.seatNumber.length==2){
                            listItems.push(<PreSeat ind={index} number={item.seatNumber} list={list} setList={setList} price={0} j={'bg-blue-700'}/>)
                                if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                        }else{
                            listItems.push(<Seat ind={index} number={item.seatNumber} list={list} setList={setList} />)
                    if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)
                        }
                    }else{
                        //console.log((item.seatNumber.charAt(0)==='1'||item.seatNumber.charAt(0)==='2')&&item.seatNumber.length==2)
                        console.log((item.seatNumber.charAt(0)==='3'||item.seatNumber.charAt(0)==='4'||item.seatNumber.charAt(0)==='5')&&item.seatNumber.length==2)
                    listItems.push(<Seat ind={index} number={item.seatNumber} list={list} setList={setList} />)
                    if(item.seatNumber.slice(-1)==='C')listItems.push(<div className='w-10 h-10'></div>)}
                
            })
        
        return listItems;
    }
  return (
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
  )
}

export default Seats
