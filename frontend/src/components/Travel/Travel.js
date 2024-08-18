import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import api from '../API/api';
const Travel = () => {
  const [showModal, setShowModal] = useState(false);
  const [showfeedback,setShowfeedback ]=useState(false)
  const [fid,setFid]=useState()
  const [review,setreview]=useState('')
  const [rating,setrating]=useState()
  const [isr,setIsr]=useState(false)
  const [departure_date,setDeparture_date]=useState()
  const [dept_time,setDept_time]=useState()
  const [complete,setComplete]=useState(false)
  const [username,setUsername]=useState('')
  const [selectedData, setSelectedData] = useState(null); // Store the selected data here
  const navigate=useNavigate()
  const check=()=>{
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    } else {
      api.get('/logged', {
        headers: {
          Authorization: token
        }
      }).then(res => {
       
        if (res.data.success) {
          setUsername(res.data.username)
          api.post('/api/user/gettravel',{username:res.data.username}).then((res)=>{setTravelHistoryData(res.data)}).catch((err)=>console.log(err))
          
            
  
        } else {
          localStorage.removeItem('token')
          navigate('/')
  
        }
      }).catch((err) => {
        localStorage.removeItem('token')
        navigate('/')
  
      })
    }
  }
  const feedback=()=>{
      api.post('/api/rating',{id:fid,rating:rating?rating:0,review:{username:username,rating:rating,review:review}}).then((res)=>{setFid();setrating('');setreview('');setIsr(!isr);setShowfeedback(false)}).catch((err)=>{console.log(err)})
  }
  useEffect(() => check(), [isr])
  // const travelHistoryData = [
  //   {
  //     airline:'Indigo',
  //     flight_id:1,
  //     date: '2024-06-01',
  //     arrival: '10:00 AM',
  //     departure: '2:30 PM',
  //     duration: '4h 30m',
  //     from: 'New York (JFK)',
  //     to: 'Los Angeles (LAX)',
  //     transactionId: 'ABC123',
  //     orderId: 'XYZ456',
  //   },
  //   {
  //     airline:'Indigo',
  //     flight_id:2,
  //     date: '2024-06-10',
  //     arrival: '8:45 AM',
  //     departure: '12:15 PM',
  //     duration: '3h 30m',
  //     from: 'Chicago (ORD)',
  //     to: 'Miami (MIA)',
  //     transactionId: 'DEF789',
  //     orderId: 'PQR987',
  //   },
  //   // Add more travel history entries as needed
  // ];
  
const [travelHistoryData,setTravelHistoryData]=useState([])
  const handleBlockClick = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  return (
    <div className='flex flex-col'>
    <div><Navbar/></div>
    <div className="bg-gradient-to-l from-purple-500 to-pink-500 min-h-screen p-8 mt-12">
        {/* <h2 className="text-2xl font-semibold text-orange-500 mb-4">Travel History</h2> */}
        {travelHistoryData.length==0&&<h1 className='text-gray-700 ml-auto mr-auto mt-auto mb-auto z-20 text-3xl font-semibold'>Hi.....Looks Like you haven't travelled with us yet!</h1>}
        <div className='flex flex-row text-xl '><button onClick={()=>setComplete(true)} className={`p-2 rounded-md shadow-sm shadow-black ${complete?'bg-gradient-to-r from-blue-400 to-teal-300':''} hover:brightness-75 `}>Completed</button><button onClick={()=>setComplete(false)} className={`p-2 rounded-md ml-20 shadow-sm shadow-black hover:brightness-90 ${!complete?'bg-gradient-to-r from-blue-400 to-red-500':''} `}>Incomplete</button></div>
      {complete&&travelHistoryData.map((data, index) => ((new Date(data.flightDetails.departure_date)<=(new Date()))&&
        <div
          key={index}
          className="bg-white mt-10 bg-opacity-50 rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
          onClick={() => handleBlockClick(data)}
        >
          <div>
            <p className="text-gray-600">{data.flightDetails.airline+' | '+data.flightDetails.flight_number+' | '+data.flightDetails.departure_date}</p>
            <p className="text-indigo-600 font-semibold">
              {data.flightDetails.departure_airport} to {data.flightDetails.arrival_airport}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Arrival: {data.flightDetails.arrival_time}</p>
            <p className="text-gray-500">Departure: {data.flightDetails.departure_time}</p>
            <p className="text-gray-500">Duration: {data.flightDetails.duration}</p>
          </div>
          
        </div>
      ))}
      {!complete&&travelHistoryData.map((data, index) => ((new Date(data.flightDetails.departure_date)>(new Date()))&&
        <div
          key={index}
          className="bg-white mt-10 bg-opacity-50 rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
          onClick={() => handleBlockClick(data)}
        >
          <div>
            <p className="text-gray-600">{data.flightDetails.airline+' | '+data.flightDetails.flight_number+' | '+data.flightDetails.departure_date}</p>
            <p className="text-indigo-600 font-semibold">
              {data.flightDetails.departure_airport} to {data.flightDetails.arrival_airport}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Arrival: {data.flightDetails.arrival_time}</p>
            <p className="text-gray-500">Departure: {data.flightDetails.departure_time}</p>
            <p className="text-gray-500">Duration: {data.flightDetails.duration}</p>
          </div>
          
        </div>
      ))}

      {/* Pop-up/modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
          {/* Modal content */}
          <div className="bg-white rounded-lg p-6 w-[30vw]">
            {/* <Modal.Header closeButton>
              
            </Modal.Header>
            <Modal.Body> */}
            <div className='font-bold'>Passengers</div>
            {selectedData?.passengers.map((item,index)=>(
              <div className='mt-1 p-2 hover:bg-gradient-to-r from-white to-gray-200 transition-all duration-300 ease-in-out flex flex-col' key={index}><div>Name : {item.name}</div>
              <div>Mail : {item.mail}</div>
              <div>Gender : {item.gender}</div>
              <div>Age : {item.age}</div>
              <div>Number : {item.number}</div>
              <div>Seat : {item.seat}</div></div>

            ))}
            <div className='font-bold  mt-2'>Transaction Details</div>
              Transaction ID : {selectedData?.paymentDetails.payment_id.split('_')[1]}
              <br />
              Order ID : {selectedData?.paymentDetails.order_id.split('_')[1]}

              <div className='font-bold'>Reviews Given By you to this Airplane</div>
              {selectedData?.feedback.map((item,index)=>(
                <div className='mt-1 p-2 hover:bg-gradient-to-r from-white to-gray-200 transition-all duration-300 ease-in-out flex flex-col' >
                {<div className='flex  font-semibold text-green-500 flex-row gap-1'>
                                    <div className="flex mt-1">{(item.rating >= 1) ? <FaStar /> : <FaRegStar />} {(item.rating >= 2) ? <FaStar /> : <FaRegStar />}{(item.rating >= 3) ? <FaStar /> : <FaRegStar />}{(item.rating >= 4) ? <FaStar /> : <FaRegStar />}{(item.rating >= 5) ? <FaStar /> : <FaRegStar />}
                                    </div>

                                </div>}
                      <div className="">{item.review.review}</div>

                </div>
              ))}
            {/* </Modal.Body>
            <Modal.Footer>
           
            </Modal.Footer> */}
             <div
                // variant="secondary"
                onClick={() => setShowModal(false)}
                className="text-red-500 cursor-pointer"
            >
                Close
            </div>
            <div
                // variant="secondary"
                onClick={() => {setShowModal(false);setFid(selectedData?.flightDetails.flight_number);setDeparture_date(selectedData?.flightDetails.departure_date);setDept_time(selectedData?.flightDetails.departure_time);setShowfeedback(true)}}
                className="text-red-500 cursor-pointer"
            >
                Give Feedback
            </div>
          </div>
        </div>
      )}
      {showfeedback&&(
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
          {/* Modal content */}
          <div className="bg-white rounded-lg h-96 p-6 w-80">
            {/* <Modal.Header closeButton>
              
            </Modal.Header>
            <Modal.Body> */}
            <div className='font-bold'>Give Rating</div>
            <div className='flex mt-2 flex-row gap-1'>{(rating>=1)?<FaStar onClick={()=>setrating(1)} />:<FaRegStar onClick={()=>setrating(1)} />} {(rating>=2)?<FaStar onClick={()=>setrating(2)} />:<FaRegStar onClick={()=>setrating(2)} />}{(rating>=3)?<FaStar onClick={()=>setrating(3)} />:<FaRegStar onClick={()=>setrating(3)} />}{(rating>=4)?<FaStar onClick={()=>setrating(4)} />:<FaRegStar onClick={()=>setrating(4)} />}{(rating>=5)?<FaStar onClick={()=>setrating(5)} />:<FaRegStar onClick={()=>setrating(5)} />}</div>
            <div className='font-bold  mt-2'>Give A Review</div>
              <textarea value={review} className='rounded-sm border-2 h-56 w-full border-gray-400' onChange={(e)=>setreview(e.target.value)} ></textarea>
              <div className='flex flex-row justify-between'>
             <div
                // variant="secondary"
                onClick={() => {setFid();setrating('');setreview('');setShowfeedback(false)}}
                className="text-red-500 cursor-pointer"
            >
                Close
            </div>
            <div
                // variant="secondary"
                onClick={() => feedback()}
                className="text-red-500 cursor-pointer"
            >
                Submit
            </div>
            </div>
          </div>
        </div>)

      }
    </div></div>
  );
};

export default Travel;
