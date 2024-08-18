import { useState } from "react";
const Sidebar = (props) => {
    const { flight_details } = props;
    const fareprice=(!(props.way==='true')?flight_details.price * props.passengers_num:flight_details.price * props.passengers_num+props.arrflight.price * props.passengers_num)  
    const handleSubmit=()=>{
        let ntru=''
        let map1=new Map()
        let arr=[]

        if(props.passenger_info_list.length!==props.passengers_num){
            window.alert("Enter all the credentials for all passengers")
            return 
        }
        props.passenger_info_list.forEach((element)=>{
            if(map1.has(element.number)){
                ntru='a'
            
        }else if(!element.number||!element.name||!element.gender||!element.mail||!element.age){
            ntru='b'
            
        }else if(Number(element.age<18)){
            ntru='c'
        }
        else{map1.set(element.number,1)}
    
    
    
    })
        if(ntru==='a'){
            window.alert("All Passengers Should Have unique Phone Number")
            return
        }
        if(ntru==='b'){
            window.alert("Enter all the credentials for all passengers")
            return
        }
        if(ntru=='c'){
            window.alert('Adult Age Should Be grater than or equal to 18')
            return
        }
        
        props.passenger_info_list.forEach((item)=>{
            arr.push({
                pname:item.name,
                seat:'Not Selected'
            })
        })
        
        props.setSeatspass(arr)
        props.setIsSeats(true)

    }
    return (
        <div className="w-[40%] h-fit flex m-6 justify-center sticky top-14">
            <div className="w-[95%] border-pink-400 border-[3px] mt-5 flex flex-col items-center bg-white rounded-[2rem] shadow-xl shadow-gray-600">
                {/* flight details box */}
                <div className="w-[90%] bg-gradient-to-r shadow-lg shadow-gray-700 from-blue-400 to-teal-400 hover:opacity-80 mt-10 p-6 h-fit border-2 border-black rounded-xl">

                    <div className="flex justify-between ">
                        <div className="text-2xl">{flight_details.airline}</div>
                        <div>Flight {flight_details.flight_number}</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-4xl">{flight_details.departure_airport}</div>
                        <div className=" row-span-2 "><img src={flight_details.image} className="w-20 h-20 mb-2 rounded-lg"/><div className="ml-5">{flight_details.duration}</div></div>
                        <div className="text-4xl">{flight_details.arrival_airport}</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex flex-col text-left">
                            <div>Departure</div>
                            <div>{flight_details.departure_date}</div>
                        </div>
                        <div className="flex-col text-right">
                            <div>Arrival</div>
                            <div>{flight_details.arrival_date}</div>
                        </div>
                    </div>

                </div>
                {(props.way==='true')&&<div className="w-[90%] bg-gradient-to-r shadow-lg shadow-gray-700 from-blue-400 to-teal-400 hover:opacity-80 mt-10 p-6 h-fit border-2 border-black rounded-xl">

<div className="flex justify-between ">
    <div className="text-2xl">{props.arrflight.airline}</div>
    <div>Flight {props.arrflight.flight_number}</div>
</div>

<div className="flex justify-between items-center">
    <div className="text-4xl">{props.arrflight.departure_airport}</div>
    <div className=" row-span-2 "><img src={props.arrflight.image} className="w-20 h-20 mb-2 rounded-lg"/><div className="ml-5">{props.arrflight.duration}</div></div>
    <div className="text-4xl">{props.arrflight.arrival_airport}</div>
</div>

<div className="flex justify-between items-center">
    <div className="flex flex-col text-left">
        <div>Departure</div>
        <div>{props.arrflight.departure_date}</div>
    </div>
    <div className="flex-col text-right">
        <div>Arrival</div>
        <div>{props.arrflight.arrival_date}</div>
    </div>
</div>

</div>}

                {/* fare and passengers */}
                <div className="w-[90%] bg-gradient-to-r shadow-lg shadow-gray-700 from-blue-400 to-teal-400 hover:opacity-80 border-2 border-black rounded-xl mt-7 p-5 flex flex-col">
                    <div className="flex  justify-between"><div className="text-left">
                        <div className="text-2xl mb-2">Fare Amount</div>
                        <div className="text-xl">₹{fareprice}</div>
                    </div>
                    <div className=" text-end">
                        <div className="text-2xl mb-2">Passengers</div>
                        <div className="text-xl">{props.passengers_num} Adult</div>
                    </div>
                    </div>
                    <div className="flex  justify-between"><div className="text-left">
                        
                        <div className="text-xl">₹{props.seatPrice}</div>
                    </div>
                    <div className="text-right">
                        
                        <div className="text-xl">Seat Price</div>
                    </div>
                    </div>
                    <div className="flex border-b-2 border-gray-400 justify-between"><div className="text-left">
                        
                        <div className="text-xl">₹{props.cfee}</div>
                    </div>
                    <div className="text-right">
                        
                        <div className="text-xl">Convenience Fee</div>
                    </div>
                    
                    </div>
                    <div className="flex mt-1 justify-between"><div className="text-left">
                        
                        <div className="text-xl">₹{props.cfee+props.seatPrice+fareprice}</div>
                    </div>
                    <div className="text-right">
                        
                        <div className="text-xl">Total</div>
                    </div>
                    
                    </div>
                </div>
                <div className="w-[90%] flex mt-2 p-6 mb-8">
                    {!props.nway&&props.isSeats&&<div className="flex justify-between"><button onClick={()=>{props.handlePayment(props.cfee+props.seatPrice+fareprice);}} className='w-24 p-2 h-10 text-white text-lg bg-[#d354bd] text-semibold rounded-3xl shadow-gray-800 shadow-md hover:scale-105 hover:bg-opacity-20'>Pay</button>
                    <button onClick={()=>{
                        let arr=[]
                         props.passenger_info_list.forEach((item)=>{
                            arr.push(Object.assign(item,{seat:''}))
                        })
                        props.setPassengerInfoList(arr)
                        if(props.way==='true'){
                            props.setNway(true)
                        }
                        props.setIsSeats(false)}} className='w-fit mr-0 ml-64 p-2 h-10 text-white text-lg bg-[#d354bd] text-semibold rounded-3xl shadow-gray-800 shadow-md hover:scale-105 hover:bg-opacity-20'>GoBack</button>
                    </div>}
                    {props.nway&&props.isSeats&&<div className="flex justify-between"><button onClick={()=>{props.setOldprice(props.cfee+props.seatPrice+fareprice);
                        let arr=[]
                        let arri=[]
                        props.passenger_info_list.forEach((item)=>{
                            arri.push(Object.assign({},item))
                           arr.push(Object.assign(item,{seat:''}))
                       })
                       props.setoldlist(arri)
                       props.setPassengerInfoList(arr)
                        props.setNway(false)}} className='w-36 p-2 h-10 text-white text-lg bg-[#d354bd] text-semibold rounded-3xl shadow-gray-800 shadow-md hover:scale-105 hover:bg-opacity-20'>Select Arrival Seats</button>
                    <button onClick={()=>{
                        let arr=[]
                         props.passenger_info_list.forEach((item)=>{
                            arr.push(Object.assign(item,{seat:''}))
                        })
                        props.setPassengerInfoList(arr)
                        props.setIsSeats(false)}} className='w-fit mr-0 ml-64 p-2 h-10 text-white text-lg bg-[#d354bd] text-semibold rounded-3xl shadow-gray-800 shadow-md hover:scale-105 hover:bg-opacity-20'>GoBack</button>
                    </div>}
                    {!props.isSeats&&<button onClick={()=>{handleSubmit()}} className='w-fit p-2 h-10 text-white text-lg bg-[#d354bd] text-semibold rounded-3xl shadow-gray-800 shadow-md hover:scale-105 hover:bg-opacity-20'>Select Seats</button>}
                </div>

            </div>
        </div>
    );
}

export default Sidebar;