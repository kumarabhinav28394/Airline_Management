import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar";
import Options from "./Options";
import api from "../API/api";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom'
import Seats from "./Seats";
const FlightOverview = () => {
  
const[searchParam]=useSearchParams()
const id=searchParam.get('id')
const way=searchParam.get('w')
const [nway,setNway]=useState((way==='true'))
const df=searchParam.get('df')
    const [flight_details,setFlight_details] = useState({})
    const [passengers_num, setPassengersNum] = useState(Number(searchParam.get('p')));
    const [loading, setLoading] = useState(false);
    const [travellers,setTravellers]=useState([])
    const [oldprice,setOldprice]=useState()
    const [oldlist,setoldlist]=useState([])
    const [arrflight,setarrflight]=useState({})
    const [arrseats,setarrseats]=useState([])
    const [addtravellers,setAddTravellers]=useState([])
    const [ispop3,setIspop3]=useState(false)
    const [stype,setStype]=useState('economy')
    const [username,setUserName]=useState('')
    const [pnumber,setPnumber]=useState()
    const [address,setAddress]=useState()
    const [passenger_info_list, setPassengerInfoList] = useState([]);
    const [seats, setSeats] = useState([])
    const [payment,setPayment]=useState({})
    const [seatspass, setSeatspass] = useState([])
    const [cfee,setCfee]=useState(200)
    const [mail,setMail]=useState('')
    const [isSeats,setIsSeats]=useState(false)
    const [seatPrice,setSeatPrice]=useState(0)
    const [type,setType]=useState(searchParam.get('t'))
    const navigate=useNavigate()
    const box=useRef()
    const check=()=>{
        const token = localStorage.getItem('token')
        if (!token) {
          navigate("/")
        } else {
          api.get('/logged', {
            headers: {
              Authorization: token
            }
          }).then(res => {
           
            if (res.data.success) {   
                       
              setTravellers(res.data.travellers);
              setUserName(res.data.username);
              setMail(res.data.usermail)
              setPnumber(res.data.number)
              setAddress(res.data.address)
            } else {
              localStorage.removeItem('token')
              navigate("/")
            }
          }).catch((err) => {
            localStorage.removeItem('token')
            navigate("/")
          })
        }
        
            api.post("/api/flights",{id:id}).then((res)=>{console.log(res.data);const flight={
                flight_number: res.data.flight_id,
                airline: res.data.flight_name,
                departure_airport: res.data.fromTitle,
                arrival_airport: res.data.toTitle,
                departure_date: res.data.dept_date,
                departure_time: res.data.dept_time,
                arrival_date: res.data.arr_date,
                arrival_time:res.data.arr_time,
                duration: res.data.duration,
                price: (type==='Business')?res.data.busiprice:(type==='Premium Economy')?res.data.premprice:res.data.price,
                image:res.data.image,
                seatId:res.data.seatId
            }
            setFlight_details(flight)
            
            api.post("/api/seats",{id:res.data.flight_id}).then((res)=>{if(res.data.success){setSeats(res.data.seats);setStype(res.data.seatClass)};if(way==='true'){
              api.post("/api/flights",{id:df}).then((res)=>{const flight={
                  flight_number: res.data.flight_id,
                  airline: res.data.flight_name,
                  departure_airport: res.data.fromTitle,
                  arrival_airport: res.data.toTitle,
                  departure_date: res.data.dept_date,
                  departure_time: res.data.dept_time,
                  arrival_date: res.data.arr_date,
                  arrival_time:res.data.arr_time,
                  duration: res.data.duration,
                  price: (type==='Business')?res.data.busiprice:(type==='Premium Economy')?res.data.premprice:res.data.price,
                  image:res.data.image,
                  seatId:res.data.seatId
              }
              setarrflight(flight)
              api.post("/api/seats",{id:res.data.flight_id}).then((res)=>{if(res.data.success){setarrseats(res.data.seats)};}).catch((err)=>{console.log(err)})
            }
              
            ).catch((err)=>{console.log(err)})}}).catch((err)=>console.log(err))
        }).catch((err)=>console.log(err))
      }
      useEffect(() => check(), [])
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000);
    // }, []);
const handlePay=(data)=>{
  const sarr=[]
  passenger_info_list.forEach((item)=>{
    sarr.push(item.seat)
  })
  const sarr2=[]
  let arr2=[]
  if(oldlist){
    oldlist.forEach((item)=>{
      sarr.push(item.seat)
    })
    arr2=arrseats.map((item)=>((sarr2.includes(item.seatNumber))?{seatNumber:item.seatNumber,price:item.price,isAvailable:false}:item))
  }
  const arr=seats.map((item)=>((sarr.includes(item.seatNumber))?{seatNumber:item.seatNumber,price:item.price,isAvailable:false}:item))

    if(way==='true'){
    
        api.post('/api/settravel',{username:username,passengers:oldlist,flightDetails:flight_details,paymentDetails:data})
        .then((res)=>{if(res.data.success){api.post('/api/settravel',{username:username,passengers:passenger_info_list,flightDetails:arrflight,paymentDetails:data})
          .then(()=>{navigate('/travel')})
        .catch((err)=>{console.log(err)})}})
        .catch((err)=>{console.log(err)})
    }else{
      api.post('/api/settravel',{username:username,passengers:passenger_info_list,flightDetails:flight_details,paymentDetails:data}).then(()=>{api.post('/api/addseats',{id:flight_details.flight_number,type:(type=='Economy')?'economy':'premium',seatarr:arr}).then(()=>navigate('/travel'))}).catch((err)=>{console.log(err)})
    }

}
    const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (amount) => {
    
    try {
      const orderResponse = await api.post('/secure/payment/order', {
        amount: amount,
        currency: 'INR',
        receipt: 'receipt#1',
        notes: { flight: 'Flight XYZ' }
      });

      
      const { id: order_id } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_key,
        amount: amount * 100,
        currency: 'INR',
        name: 'Flight Booking',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async (response) => {
          
          setPayment({order_id:response.razorpay_order_id,payment_id: response.razorpay_payment_id,signature:response.razorpay_signature})
          ;handlePay({order_id:response.razorpay_order_id,payment_id: response.razorpay_payment_id,signature:response.razorpay_signature})
          try {
            await api.post('/secure/payment/success', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            setPaymentSuccess(true);
          } catch (error) {
            console.error('Error in payment success:', error);
          }
        },
        prefill: {
          name: username,
          email: mail,
          contact: pnumber
        },
        notes: {
          address: address
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
    return (
        <>  {ispop3&&<div onClick={(e) => {const r=box.current; if (!(e.target===box.current||r.contains(e.target))) { setIspop3(false) } }} className=' flex z-10 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
        <div ref={box} className='bg-white w-[30vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-auto '>
        <h1 className='text-2xl self-start font-semibold'>Choose Travellers</h1>
        <div className='flex mt-4 flex-col p-1'>
        <div className='flex mb-6 flex-row'><h1 className='text-4xl font-semibold'>Saved Travellers</h1></div>
            {travellers&&travellers.map((item,index)=>(<div onClick={()=>{setAddTravellers(travellers[index]); setIspop3(false)}} className='mt-4 flex flex-col bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'>
              <h1 className='text-lg font-semibold ml-auto mr-auto '>Taveller {index+1}</h1>
               <div className='w-full flex px-6 items-center flex-row h-14 '><h1 className='w-20 text-gray-600' >Name</h1><h1 className='ml-20 font-semibold'>{item.name}</h1></div>
               <div className='w-full flex px-6 items-center flex-row h-14 '><h1 className='w-20 text-gray-600'>Mail</h1><h1 className='ml-20 font-semibold'>{item.mail}</h1></div>
               </div>))}
            {!travellers&&<div>You have not saved any traveller. You can do so by going to your profile </div>}   
           <button onClick={()=>setIspop3(false)} className='w-28 h-10 bg-white ml-14 text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>
    
           </div>
          </div>
          </div>}
            <Navbar />
            {loading ? (
                <>
                    <div className='h-[4.2rem]'></div>
                    <div className="text-center p-20">Fetching Flight Details...</div>
                </>
            ) : (
                <>
                    <div className='h-[4.2rem]'></div>
                    <div className="flex w-full bg-gradient-to-r from-purple-500 to-pink-500">
                        <Sidebar
                            flight_details={flight_details}
                            passengers_num={passengers_num}
                            passenger_info_list={passenger_info_list}
                            setPassengerInfoList={setPassengerInfoList}
                            isSeats={isSeats}
                            setIsSeats={setIsSeats}
                            seatPrice={seatPrice}
                            cfee={cfee}
                            handlePayment={handlePayment}
                            handlePay={handlePay}
                            seatspass={seatspass}
                            setSeatspass={setSeatspass}
                            way={way}
                            nway={nway}
                            setNway={setNway}
                            df={df}
                            oldprice={oldprice}
                            setOldprice={setOldprice}
                            oldlist={oldlist}
                            setoldlist={setoldlist}
                            arrflight={arrflight}
                        />
                        
                        {<Options
                            passengers_num={passengers_num}
                            setPassengersNum={setPassengersNum}
                            passenger_info_list={passenger_info_list}
                            setPassengerInfoList={setPassengerInfoList}
                            flight_details={flight_details}
                            setIspop3={setIspop3}
                            isSeats={isSeats}
                            addtravellers={addtravellers}
                            setAddTravellers={setAddTravellers}
                            type={type}
                        />}
                        {!nway&&isSeats&&<Seats seats={seats}
                            seatsPrice={seatPrice}
                            setSeatsPrice={setSeatPrice}
                            type={type}
                            num={passengers_num}
                            passenger_info_list={passenger_info_list}
                            setPassengerInfoList={setPassengerInfoList}
                            stype={stype}
                        />}
                        {nway&&isSeats&&<Seats seats={arrseats}
                            seatsPrice={seatPrice}
                            setSeatsPrice={setSeatPrice}
                            type={type}
                            num={passengers_num}
                            passenger_info_list={passenger_info_list}
                            setPassengerInfoList={setPassengerInfoList}
                            stype={stype}
                        />}
                        
                    </div>
                </>
            )}
        </>
    );
}

export default FlightOverview;