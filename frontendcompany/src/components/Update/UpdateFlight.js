import React, { useRef,useEffect,useState } from 'react'
import api from '../API/api'
import listl from './listl.svg'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
const UpdateFlight = () => {
    const navigate=useNavigate()
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
      useEffect(() => check(), [])
    const [port,setPort]=useState({})
    const ftt=async()=>{
        const data=await api.get('/api/getall')
        console.log(data.data[0])
        setPort(data.data)
      }
      useEffect(()=>{
        ftt()
      },[])
      
      const [img,setImg]=useState('')
      const [id,setId]=useState()
    const dept=useRef();
    const air=useRef();
    const dur=useRef();
    const arr=useRef();
    const price=useRef();
    const logo=useRef();
    const input1=useRef();
    const input2=useRef();
    
    const [premprice,setPremprice]=useState()
    const [busiprice,setBusiprice]=useState()
    const [from,setFrom]=useState('')
    const [premium,setPremium]=useState()
    
    const [row,setRow]=useState(10)
    const [isFocus,setIsFocus]=useState('')
    const input3=useRef()
    const [searchTerm,setSearchTerm]=useState()
    const [filteredData,setFilteredData]=useState([])
    const [fiata,setFiata]=useState('')
    const [notMsg,setNotMsg]=useState(false)
    const [to,setTo]=useState('')
    const [isFocusp,setIsFocusp]=useState('')
    const input4=useRef()
    const [searchTo,setSearchTo]=useState()
    const [tiata,setTiata]=useState('')
    const handleSearchChange = (event, s) => {
        if (s === 'f') {
          setSearchTerm(event.target.value)
    
    
        }
        if (s === 't') {
          setSearchTo(event.target.value)
        }
      };
      useEffect(() => {

        
        const f = input1.current
        const t = input2.current
        window.onclick = (event) => {
          
          if (f.contains(event.target)) {
    
            setIsFocus(true)
            input3.current.focus()
          } else {
            setSearchTerm('')
            setIsFocus(false)
          }
          if (t.contains(event.target)) {
    
            setIsFocusp(true)
            input4.current.focus()
          } else {
            setSearchTo('')
            setIsFocusp(false)
          }
    
        }
      }, []);
      const ft = async () => {

        if (searchTo&&searchTo.length > 2) {
          // const ress=await mhandle.get("/",{params: {query: searchTo}})
          //console.log(ress.data.data[0].presentation.suggestionTitle)
          //const nfilteredData = ress.data.data.map((item) =>item.presentation.suggestionTitle)
          const nfilteredData = port.filter((item) =>
            item.name.toLowerCase().includes(searchTo.toLowerCase()) || item.location.toLowerCase().includes(searchTo.toLowerCase())
          )
          setFilteredData(nfilteredData)
        } else {
          const nfilteredData = []
          setFilteredData(nfilteredData)
        }
        if (searchTerm&&searchTerm.length > 2) {
          //const ress=await mhandle.get("/",{params: {query: searchTerm}})
          //console.log(ress.data.data[0].presentation.suggestionTitle)
          //const nfilteredData = ress.data.data.map((item) =>item.presentation.suggestionTitle)
          const nfilteredData = port.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase())
          )
    
          setFilteredData(nfilteredData)
        } else {
          if (!searchTo) {
            const nfilteredData = []
            setFilteredData(nfilteredData)
          }
        }
    
      }
      const checki=()=>{
        api.post("/api/flights",{id:id}).then((res)=>{if(res.data.success){
            
            air.current.value= res.data.flight_name
            dept.current.value=res.data.dept_date.toString()+'T'+res.data.dept_time.toString()
            arr.current.value=res.data.arr_date.toString()+'T'+res.data.arr_time.toString()
            dur.current.value=res.data.duration.toString()
            price.current.value=res.data.price
            setImg(res.data.image)
            setFiata(res.data.from)
            setTiata(res.data.to)
            setPremium(res.data.premium)
            setRow(res.data.seatRows)
             setFrom(res.data.fromTitle)
             setTo(res.data.toTitle)
            setNotMsg(false)
            setPremprice(res.data.premprice)
            setBusiprice(res.data.busiprice)
        
    }else{if(id){setNotMsg(true)}else{setNotMsg(false)}}}).catch((err)=>{console.log(err)})
      }
    
    
      useEffect(() => {
        ft()
      }, [searchTerm, searchTo])
    
    const handleSubmit=(data)=>{
        
        
        
        console.log(data)
        api.post("/api/setflights",{flight_id:id,flight_name:data.flight_name, dept_time:data.dept_time,dept_date:data.dept_date,duration:data.duration,price:data.price,from:data.from,to:data.to,premium:data.premium,business:data.business,arr_time:data.arr_time,arr_date:data.arr_date,fromTitle:data.fromTitle,toTitle:data.toTitle,image:img,seatRows:row,premprice:premprice,busiprice:busiprice}).then((res)=>{
          window.alert('Details Submitted')
            
        }).catch((err)=>{console.log(err)})
    
    }
  return (
    <>
    <Navbar/>
    <div className='h-[4.2rem]'></div>
    <div className='w-screen justify-center items-center flex h-screen bg-gradient-to-r from-purple-500 to-pink-500'>
       <div className='bg-white w-[70%] rounded-lg flex flex-col'>
       <div className='h-10 col-span-2 flex items-center rounded-t-lg px-10 text-2xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-500'>Enter Details</div>
         <div className='bg-white w-[70%] rounded-lg p-10 grid gap-x-60 grid-cols-2'>
            
         <div className='w-96 h-16 flex flex-col'>
        <label className='font-semibold' for='company'>Flight Id</label>
      <input value={id} onChange={(e)=>{setId(e.target.value)}} onBlur={()=>{checki()}} className='h-12 border-2 border-purple-600 rounded-md px-2 w-96' id='company' type='text' placeholder='ABC Flights' />
      {notMsg&&<div className='text-red-500 mt-16 fixed'>Not a valid ID</div>}
      </div>
            <div className='w-96 h-16 flex flex-col'>
        <label className='font-semibold' for='company'>Airlines Name</label>
      <input ref={air} className='h-12 border-2 border-purple-600 rounded-md px-2 w-96' id='company' type='text' placeholder='ABC Flights' />
      </div>
      <div className='w-96 h-16 mt-5 flex flex-col'>
        <label className='font-semibold' for='company'>Departure</label>
      <input ref={dept} className='h-12 border-2 border-purple-600 rounded-md px-2 w-96' id='company' type='datetime-local' />
      </div>
      <div className='w-96 h-16 mt-5 flex flex-col'>
        <label className='font-semibold' for='company'>Duration</label>
      <input ref={dur} className='h-12 w-96 border-2 border-purple-600 rounded-md px-2' id='company' type='time' />
      </div>
      <div className='w-96 h-16 mt-5 flex flex-col'>
        <label className='font-semibold' for='company'>Arrival</label>
      <input ref={arr} className='h-12 w-96 border-2 border-purple-600 rounded-md px-2' id='company' type='datetime-local' />
      </div>
      <div className='w-96 h-16 mt-5 flex flex-col'>
        <label className='font-semibold' for='company'>Price</label>
      <input ref={price} className='h-12 w-96 border-2 border-purple-600 rounded-md px-2' id='company' type='number' />
      </div>
      <div className='w-96 h-16 mt-5 flex flex-col'>
        <label className='font-semibold' for='image'>Choose Company Logo</label>
      <input ref={logo} value={img} onChange={(e)=>{setImg(e.target.value)}} className='h-12 border-purple-600 border-2 mt-1 w-96 ' id='image' type='text' />
      </div>
      <div ref={input1} className='flex ml-5 flex-col h-20 mt-3 justify-center items-center'>
      <label className='font-semibold self-start'  >From iata</label>
                <input value={fiata ? fiata : ''} className=' focus:outline-purple-800 relative rounded-md p-1 pl-5 border-[2px] border-purple-600 h-10 w-[14rem] ' ></input>
                <div className={`flex  absolute items-center w-0 transition-all -z-10 duration-300 ease-in-out transform ${isFocus ? 'mt-32 ml-10 rounded-md z-10 bg-gray-100 px-3 py-2 w-72 shadow-sm ' : ''}`}>
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"></path>
                  </svg>
                  <input
                    type="text"
                    className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    ref={input3}
                    placeholder='Search..'
                    value={searchTerm}
                    onChange={(event) => handleSearchChange(event, 'f')}

                  />
                  {searchTerm && isFocus && (
                    <ul className="absolute overflow-y-scroll bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-gray-600 rounded-md mt-80 h-56 flex flex-col p-4 pl-1 w-72 search-results">
                      {filteredData.map((item) => (
                        <li onClick={() => { setFrom(item.location.split(',')[0]); setFilteredData([]); setFiata(item.iata); setIsFocus(false) }} key={item._id} className='bg-white mb-1 cursor-pointer bg-opacity-0 transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105'><h1><img src={listl} alt="" className='h-6 w-6 mr-1 rounded-full inline-block' />{item.name}</h1><h4 className='ml-7 text-sm'>{item.location}</h4></li>))}
                    </ul>)}
                </div>
              </div>
              <div ref={input2} className='flex flex-col mt-3 ml-4  h-20 justify-center items-center'>
              
              <label className='font-semibold self-start'  >To iata</label>
                <input value={tiata ? tiata : ''} className=' relative p-1  focus:outline-purple-800 pl-5 border-[2px] border-purple-600 h-10 rounded-md w-[14rem]' ></input>
                <div className={`flex  absolute items-center w-0 transition-all -z-10 duration-300 ease-in-out transform ${isFocusp ? 'mt-32 ml-10 rounded-md z-10 bg-gray-100 px-3 py-2 w-72 shadow-sm ' : ''}`}>
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"></path>
                  </svg>
                  <input
                    type="text"
                    className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    ref={input4}
                    placeholder='Search..'
                    value={searchTo}
                    onChange={(event) => handleSearchChange(event, 't')}
                  />
                  {searchTo && isFocusp && (
                    <ul className="absolute overflow-scroll bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-gray-600 rounded-md mt-80 flex flex-col p-4 w-72 h-56 search-results">
                      {filteredData.map((item) => (
                        <li onClick={() => { setTo(item.location.split(',')[0]); setFilteredData([]); setTiata(item.iata); setIsFocusp(false) }} key={item._id} className='bg-white cursor-pointer mb-1 bg-opacity-0 transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105'><h1><img src={listl} alt="" className='h-6 w-6 mr-1 rounded-full inline-block' />{item.name}</h1><h4 className='text-sm'>{item.location}</h4></li>
                      ))}
                    </ul>)}
                </div>
              </div>
              
      <div className='w-96 h-14 mt-3 flex flex-col'>
        <label className='font-semibold mr-4' for='company'>Enter number of Rows</label>
        <input value={row} onChange={(e)=>setRow(e.target.value)} className='h-12 border-2 border-purple-600 rounded-md px-2 w-96' id='company' type='text' />
        </div>
        {premium&&<div className=' col-span-2 flex flex-row'>
        <div className='w-96 h-16 mt-5 flex flex-col'>
        <label className='font-semibold' for='company'>Business Price</label>
      <input value={busiprice} onChange={(e)=>setBusiprice(e.target.value)} className='h-12 w-96 border-2 border-purple-600 rounded-md px-2' id='company' type='number' />
      </div>
      <div className='w-96 h-16 ml-16 mt-5 flex flex-col'>
      <label className='font-semibold' for='company'>Premium Price</label>
    <input value={premprice} onChange={(e)=>setPremprice(e.target.value)} className='h-12 w-96 border-2 border-purple-600 rounded-md px-2' id='company' type='number' />
    </div>
    </div>
      }
     
      </div>
      <div className='flex justify-between mx-[25%]'>
      <button onClick={()=>{let data={};if(!notMsg&&price.current.value&&from&&air.current.value&&dept.current.value&&dur.current.value&&arr.current.value&&to&&img&&row&&id){
        data= {

        flight_name:air.current.value,
        dept_time:dept.current.value.split('T')[1],
        dept_date:dept.current.value.split('T')[0],
        duration:dur.current.value,
        price:price.current.value,
        from:fiata,
        to:tiata,
        premium:premium,
        arr_time:arr.current.value.split('T')[1],
        arr_date:arr.current.value.split('T')[0],
        fromTitle:from,
        toTitle:to,
        image:img,
        seatRows:row
        
        };handleSubmit(data)}else{window.alert('Enetr All the Details')}; console.log(price.current.value)}} className='w-28 text-white mt-2 mb-2 self-center bg-blue-700 h-10 rounded-3xl hover:scale-110 hover:bg-brightness-75 ' >Submit</button>
        {!notMsg&&id&&<button onClick={()=>navigate('/updateseats/'+id.toString())} className='w-28 text-white mt-2 mb-2 self-center bg-blue-700 h-10 rounded-3xl hover:scale-110 hover:bg-brightness-75 ' >Update Seats</button>}
        </div>
      </div>
    </div>
    
    </>
  )
}

export default UpdateFlight
