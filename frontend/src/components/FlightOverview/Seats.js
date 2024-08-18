import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../API/api'
const Seats = ({seats,seatsPrice,setSeatsPrice,type,num,passenger_info_list,setPassengerInfoList,stype}) => {
    const navigate = useNavigate()
    const [rerender,setrerender]=useState(true)
    const [seatsk, setSeatsk] = useState([])
    const [seatsc, setSeatsc] = useState([])
    const [seatsp,setSeatsp] = useState([])
    const [pass,setPass]=useState(passenger_info_list)
    

    const booked = ['5A', '5C', '5D', '3A', '1A', '6B', '9F']
    const xl = ['6A', '6C', '6D', '6E', '6F', '5B', '5E', '5F']
    

    const handleClick = (e) => {
        let p = e.currentTarget.classList.value
        let q = p.split(' ')
        let u=e.target.innerText
        let j=''
        let c=u.slice(-1)
            u=Number(u.slice(0,-1))
            let k=(u-1)*6+(c.charCodeAt(0)-65)
            if((seats[k].price)===0){
                    j='bg-green-500'
            }
            else if((seats[k].price)<=300){
                j='bg-green-700'
                
        }
        else if((seats[k].price)<=500){
            j='bg-blue-300'
            
    }
    else{
        j='bg-purple-500'
        
}
        if (q.includes(j)) {
            //console.log('green')
            e.currentTarget.classList.toggle(j)
            e.currentTarget.classList.toggle('bg-blue-500');

            if (seatsk.length < num) {
                let array = seatsk
                let arrayc=seatsc
                let arrayp=seatsp
                array.push(e.currentTarget)
                arrayc.push(j)
                arrayp.push((seats[k].price))
                setSeatsk(array)
                setSeatsc(arrayc)
                setSeatsp(arrayp)
                setSeatsPrice(seatsPrice+(seats[k].price))
                let arr=passenger_info_list
                arr[seatsk.length-1].seat=e.currentTarget.innerText
                setPassengerInfoList(arr)
                setPass(arr)
                setrerender(!rerender)
            } else {
                seatsk[0].classList.toggle('bg-blue-500')
                seatsk[0].classList.toggle(seatsc[0])
                let array = seatsk
                let arrayc=seatsc
                let arrayp=seatsp
                array.shift()
                arrayc.shift()
                setSeatsPrice(seatsPrice+(seats[k].price)-seatsp[0])
                arrayp.shift()
                array.push(e.currentTarget)
                arrayc.push(j)
                arrayp.push((seats[k].price))
                setSeatsk(array)
                setSeatsc(arrayc)
                setSeatsp(arrayp)
                let arr=passenger_info_list
                let com=arr[0]
                com.seat=e.currentTarget.innerText
                arr.shift()
                arr.push(com)
                setPassengerInfoList(arr)
                setPass(arr)
                setrerender(!rerender)
            }
        } else {
            e.currentTarget.classList.toggle('bg-blue-500');
            e.currentTarget.classList.toggle(j);
            let array = seatsk
            let arrayc=seatsc
            let arrayp=seatsp
            const ind = seatsk.indexOf(e.currentTarget)
            array.splice(ind, 1)
            arrayc.splice(ind,1)
            setSeatsPrice((seatsPrice)-seatsp[ind])
            arrayp.splice(ind,1)
            setSeatsk(array)
            setSeatsc(arrayc)
            setSeatsp(arrayp)
            let arr=passenger_info_list
            arr[ind].seat=''
            setPassengerInfoList(arr)
            setPass(arr)
            setrerender(!rerender)
        }
        

    }
    const handleBusi=(e)=>{
        
        let p = e.currentTarget.classList.value
        let q = p.split(' ')

        if(q.includes('bg-yellow-500')){
            if (seatsk.length < num) {
                let array = seatsk
                
        array.push(e.currentTarget)
        e.currentTarget.classList.value='bg-blue-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
        setSeatsk(array)
        let arr=passenger_info_list
        arr[seatsk.length-1].seat=e.currentTarget.innerText
        setPassengerInfoList(arr)
        setPass(arr)
        setrerender(!rerender)
    }
        else{
            seatsk[0].classList.value='bg-yellow-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
            let array = seatsk
            array.shift()
            e.currentTarget.classList.value='bg-blue-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
            array.push(e.currentTarget)
            setSeatsk(array)
            let arr=passenger_info_list
                let com=arr[0]
                com.seat=e.currentTarget.innerText
                arr.shift()
                arr.push(com)
                setPassengerInfoList(arr)
                setPass(arr)
                setrerender(!rerender)
        }
    }else{
        e.currentTarget.classList.value='bg-yellow-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
        let array = seatsk
        const ind = seatsk.indexOf(e.currentTarget)
        array.splice(ind, 1)
        setSeatsk(array)
        let arr=passenger_info_list
            arr[ind].seat=''
            setPassengerInfoList(arr)
            setPass(arr)
            setrerender(!rerender)
    }
    
    }
    const handlePrem=(e)=>{
        let p = e.currentTarget.classList.value
        let q = p.split(' ')

        if(q.includes('bg-blue-700')){
            if (seatsk.length < num) {
                let array = seatsk
                
        array.push(e.currentTarget)
        e.currentTarget.classList.value='bg-blue-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
        setSeatsk(array)
        let arr=passenger_info_list
        arr[seatsk.length-1].seat=e.currentTarget.innerText
        setPassengerInfoList(arr)
        setPass(arr)
        setrerender(!rerender)
    
    }
        else{
            
            seatsk[0].classList.value='bg-blue-700 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
            let array = seatsk
            array.shift()
            e.currentTarget.classList.value='bg-blue-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
            array.push(e.currentTarget)
            setSeatsk(array)
            let arr=passenger_info_list
                let com=arr[0]
                com.seat=e.currentTarget.innerText
                arr.shift()
                arr.push(com)
                setPassengerInfoList(arr)
                setPass(arr)
                setrerender(!rerender)
        }
    }else{
        e.currentTarget.classList.value='bg-blue-700 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10'
        let array = seatsk
        const ind = seatsk.indexOf(e.currentTarget)
        array.splice(ind, 1)
        setSeatsk(array)
        let arr=passenger_info_list
            arr[ind].seat=''
            setPassengerInfoList(arr)
            setPass(arr)
            setrerender(!rerender)
    }

    }
   
    const renderList = () => {
        const listItems = [];
        const lisb=['1A','1C','1D','1F','2A','2C','2D','2F']
        const lisl=['1B','1E','2B','2E']
        const lisp=['3A','3B','3C','3D','3E','3F','4A','4B','4C','4D','4E','4F','5A','5B','5C','5D','5E','5F']
            seats.map((item,index) => {
                if(type==='Business'){
                    if(lisb.includes(item.seatNumber)){
                        listItems.push(<button onClick={(e) => handleBusi(e)} className='bg-yellow-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)
                        
                    }else if(lisl.includes(item.seatNumber)){
                        listItems.push(<div className='w-10 h-10'></div>)
                    }else{
                        listItems.push(<button className='bg-red-500 w-10 text-white rounded-md cursor-not-allowed h-10' key={index}></button>)
                    }
                    if(item.seatNumber.slice(-1)==='C'){
                        listItems.push(<div className='w-10 h-10'></div>)
                    }
                }else if(type==='Premium Economy'){
                    if(lisp.includes(item.seatNumber)){
                        listItems.push(<button onClick={(e) => handlePrem(e)} className='bg-blue-700 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)
                    }else{
                        listItems.push(<button className='bg-red-500 w-10 text-white rounded-md cursor-not-allowed h-10' key={index}></button>)
                    }
                    if(item.seatNumber.slice(-1)==='C'){
                        listItems.push(<div className='w-10 h-10'></div>)
                    }
                }else{
                    if(stype==='economy'){
                if (!item.isAvailable) {
                    listItems.push(<button className='bg-red-500 w-10 text-white rounded-md cursor-not-allowed h-10' key={index}>{item.seatNumber}</button>)
                }
                else {
                    if((item.price)===0){
                    listItems.push(<button onClick={(e) => handleClick(e)} className='bg-green-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}
                    else if((item.price)<=300){listItems.push(<button onClick={(e) => handleClick(e)} className='bg-green-700 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}
                    else if((item.price)<=500){listItems.push(<button onClick={(e) => handleClick(e)} className='bg-blue-300 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}
                    else {listItems.push(<button onClick={(e) => handleClick(e)} className='bg-purple-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}

                }
                if(item.seatNumber.slice(-1)==='C'){
                    listItems.push(<div className='w-10 h-10'></div>)
                }
    }else{
        if(lisb.includes(item.seatNumber)){
            listItems.push(<button className='bg-red-500 w-10 text-white rounded-md cursor-not-allowed h-10' key={index}>{item.seatNumber}</button>)
            
        }else if(lisl.includes(item.seatNumber)){
            listItems.push(<div className='w-10 h-10'></div>)}
            else if(lisp.includes(item.seatNumber)){
                listItems.push(<button className='bg-red-500 w-10 text-white rounded-md cursor-not-allowed h-10' key={index}>{item.seatNumber}</button>)
            }else{
                if (!item.isAvailable) {
                    listItems.push(<button className='bg-red-500 w-10 text-white rounded-md cursor-not-allowed h-10' key={index}>{item.seatNumber}</button>)
                }
                else {
                    if((item.price)===0){
                    listItems.push(<button onClick={(e) => handleClick(e)} className='bg-green-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}
                    else if((item.price)<=300){listItems.push(<button onClick={(e) => handleClick(e)} className='bg-green-700 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}
                    else if((item.price)<=500){listItems.push(<button onClick={(e) => handleClick(e)} className='bg-blue-300 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}
                    else {listItems.push(<button onClick={(e) => handleClick(e)} className='bg-purple-500 w-10 text-white hover:brightness-75 cursor-pointer hover:shadow-sm hover:shadow-black rounded-md h-10' key={index}>{item.seatNumber}</button>)}

                }
            }
            if(item.seatNumber.slice(-1)==='C'){
                listItems.push(<div className='w-10 h-10'></div>)
            }
    }}})
        
        return listItems;
    };



    return (<div className='flex h-full py-16 items-center justify-center'>
        
        <div className='bg-gradient-to-r ml-14 from-pink-500 to-blue-500 flex flex-col items-center mt-auto mb-auto border-2 border-solid border-gray-300 justify-center rounded-lg'>
            <div className=' border-solid  border-gray-300 text-white border-b-2 px-3 pt-1 h-10 w-full text-xl'>Seat Selection</div>
            <div className='flex bg-white flex-col p-6 py-6 items-center  rounded-b-lg justify-center w-[50vw]'>
               <div className='flex flex-row gap-x-60'> <h1 className='text-2xl font-semibold self-start '>Select your Seat</h1>
               <ul  className='ml-72 w-40 bg-gray-100 fixed z-20 mb-auto p-2 rounded-md border-2 border-gray-600 shadow-md shadow-gray-500'>
                    {pass&&pass.map((item)=>(
            <li className='mt-2'><div>Name : {item.name}</div><div className=''>Seat : {item.seat?item.seat:'Not Selected'}</div></li>
        ))}
                </ul></div>
                
                
                <div className=' mt-7 grid-cols-7 gap-2 w-[21vw] grid'>
                    <div className=' col-span-3 text-red-500 font-semibold w-full h-10'>Exit</div><div className='w-10 h-10'></div><div className=' col-span-3 flex flex-row justify-end text-red-500 font-semibold w-full h-10'>Exit</div>
                    {renderList()}
                    <div className=' mt-3 col-span-3 text-red-500 font-semibold w-full h-10'>Exit</div><div className='w-10 h-10'></div><div className=' mt-3 col-span-3 flex flex-row justify-end text-red-500 font-semibold w-full h-10'>Exit</div>
                </div>
                
                
            </div></div></div>
    )
}

export default Seats
