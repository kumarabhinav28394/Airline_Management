import React from 'react'
import { useState } from 'react'
import home from './flightbg.jpg'
import arrow from "./arrow.png"
import api from '../API/api'
import image from './image.png'
import listl from './listl.svg'
import Navbar from '../Navbar/Navbar'

import { useRef } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const [port, setPort] = useState({})
  const navigate = useNavigate()
  const ftt = async () => {
    const data = await api.get('/api/getall')
    
    setPort(data.data)
  }
  useEffect(() => {
    ftt()
  }, [])

  const [isFocus, setIsFocus] = useState(false);
  const [isFocusp, setIsFocusp] = useState(false);
  const [isFocusc, setIsFocusc] = useState(false)
  const [opt, setOpt] = useState('Economy')
  const [tcount, setTcount] = useState(1)
  const [acount, setAcount] = useState(1)
  const [ccount, setCcount] = useState(0)
  const [icount, setIcount] = useState(0)

  const [fiata, setFiata] = useState('')
  const [tiata, setTiata] = useState('')
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [filteredData, setFilteredData] = useState([])
  const handleSearchChange = (event, s) => {
    if (s === 'f') {
      setSearchTerm(event.target.value)


    }
    if (s === 't') {
      setSearchTo(event.target.value)
    }
  };
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rtrip, setRtrip] = useState(false)
  const input1 = useRef()
  const input2 = useRef()
  const input3 = useRef()
  const input4 = useRef()
  const input5 = useRef()
  const dbtton = useRef()
  const boxRef = useRef()
  const handleDateChange1 = (event) => {
    setSelectedDate1(new Date(event.target.value));

  };
  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));

  };

  useEffect(() => {

    const r = boxRef.current
    const f = input1.current
    const t = input2.current
    window.onclick = (event) => {
      if ((event.target === input5.current || r.contains(event.target)) && event.target !== dbtton.current) {

        setIsFocusc(true)
      } else {

        setIsFocusc(false)
      }
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
  const chmin = (e) => {
    if (tcount > 1) {
      if (e === 'a' && acount > 0) {
        setAcount(acount - 1)

      }
      if (e === 'c' && ccount > 0) {
        setCcount(ccount - 1)
      }
      if (e === 'i' && icount > 0) {
        setIcount(icount - 1)
      }
      setTcount(tcount - 1)
    }
  }
  const chadd = (e) => {
    if (e === 'a') {
      setAcount(acount + 1)

    }
    if (e === 'c') {
      setCcount(ccount + 1)

    }
    if (e === 'i') {
      setIcount(icount + 1)

    }
    setTcount(tcount + 1)
  }
  const ft = async () => {

    if (searchTo.length > 2) {
      // const ress=await mhandle.get("/",{params: {query: searchTo}})
      //console.log(ress.data.data[0].presentation.suggestionTitle)
      //const nfilteredData = ress.data.data.map((item) =>item.presentation.suggestionTitle)
      const nfilteredData = port&&port.filter((item) =>
        item.name.toLowerCase().includes(searchTo.toLowerCase()) || item.location.toLowerCase().includes(searchTo.toLowerCase())
      )
      setFilteredData(nfilteredData)
    } else {
      const nfilteredData = []
      setFilteredData(nfilteredData)
    }
    if (searchTerm.length > 2) {
      //const ress=await mhandle.get("/",{params: {query: searchTerm}})
      //console.log(ress.data.data[0].presentation.suggestionTitle)
      //const nfilteredData = ress.data.data.map((item) =>item.presentation.suggestionTitle)
      const nfilteredData = port&&port.filter((item) =>
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


  useEffect(() => {
    ft()
  }, [searchTerm, searchTo])

  return (
    <><Navbar />
      <div className='h-[4.2rem]'></div>
      <div className=' bg-gray-200 h-full w-full flex flex-col justify-center items-center px-2'>
        <div className={` bg-contain bg-no-repeat mt-1 w-[99vw] h-[64vh] flex flex-col justify-center items-center`} style={{ backgroundImage: `url(${home})` }} >
          <div className='w-[86vw] h-[26vh] opacity-95 p-4 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-gray-600 rounded-md mt-52 '>
            <div className='flex flex-row'>
              <div className="flex items-center ">
                <input onClick={() => setRtrip(false)} defaultChecked type="radio" name="default-radio" className="w-4 h-4 accent-blue-600 " />
                <label className="ms-2 text-sm font-medium text-white">One Way</label>
              </div>
              <div className="flex items-center ml-5">
                <input onClick={() => setRtrip(true)} type="radio" name="default-radio" className="w-4 h-4 accent-blue-600" />
                <label className="ms-2 text-sm font-medium text-white">Round Trip</label>
              </div>
            </div>
            <div className='relative flex mt-5 flex-row '>
              <div ref={input1} className='flex flex-col h-20 justify-center items-center'>
                <label className={`absolute z-10 ml-6 p-1 flex self-start transition-translate duration-300 ease-in-out transform ${isFocus || from ? 'ml-4 mb-14 text-white w-12 items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-xs' : ''}`}>From</label>
                <input value={from ? from : ''} className=' focus:outline-purple-800 relative p-1 pl-5 border-[2px] border-purple-600 h-14 w-[14rem] ' ></input>
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
                        <li onClick={() => { setFrom(item.name); setFilteredData([]); setFiata(item.iata); setIsFocus(false) }} key={item._id} className='bg-white mb-1 cursor-pointer bg-opacity-0 transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105'><h1><img src={listl} alt="" className='h-6 w-6 mr-1 rounded-full inline-block' />{item.name}</h1><h4 className='ml-7 text-sm'>{item.location}</h4></li>))}
                    </ul>)}
                </div>
              </div>
              <img src={arrow} alt="" onClick={() => {
                const temp = to
                setTo(from)
                setFrom(temp)
              }} className='absolute z-10 bg-white mt-7 ml-[13.2rem] shadow-black h-6 w-6 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-gray-600 hover:shadow-md' />
              <div ref={input2} className='flex flex-col  border-white border-l-none h-20 justify-center items-center'>
                <label className={`absolute z-10 ml-6 p-1 self-start transition-translate flex duration-300 ease-in-out transform ${isFocusp || to ? 'ml-4 mb-14 text-white rounded-3xl w-8 items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-xs' : ''}`}>To</label>
                <input value={to ? to : ''} className=' relative p-1  focus:outline-purple-800 pl-5 border-[2px] border-purple-600 h-14 w-[14rem]' ></input>
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
                        <li onClick={() => { setTo(item.name); setFilteredData([]); setTiata(item.iata); setIsFocusp(false) }} key={item._id} className='bg-white cursor-pointer mb-1 bg-opacity-0 transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105'><h1><img src={listl} alt="" className='h-6 w-6 mr-1 rounded-full inline-block' />{item.name}</h1><h4 className='text-sm'>{item.location}</h4></li>
                      ))}
                    </ul>)}
                </div>
              </div>
              <div className='flex flex-col mt-3 h-20 ml-3'>
                <input ref={input5} className={`relative border-2 border-purple-600 focus:outline-purple-800 text-md h-14 w-64 p-2 items-center`} type='text' readOnly value={`${tcount} Travellers | ${opt}`} />
                <div ref={boxRef} className={`absolute flex flex-col  mt-20 w-[40rem] p-4 h-72 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all duration-300 ease-in-out transform ${isFocusc ? 'block ' : 'hidden'}`}>
                  <div className='border-b-2 h-52 border-purple-400 flex flex-row'>
                    <div className='flex h-48 flex-col'>
                      <div className='flex flex-row'><div className='flex mb-3 flex-col'><h1 className='font-semibold w-24 mr-7'>Adults</h1><h2 className='text-slate-200 text-xs'>Above 12 yrs</h2></div> <button onClick={() => chmin('a')} className='w-8 h-9 border-r-0 text-4xl flex flex-row items-center justify-center pb-3 bg-white bg-opacity-5 shadow-lg hover:scale-110 hover:brightness-50'>-</button> <input className='flex flex-row h-9 w-8 text-center' readOnly value={acount}></input> <button onClick={() => { chadd('a') }} className='w-8 h-9 bg-opacity-5 bg-white shadow-xl text-2xl flex flex-row items-center hover:scale-110 hover:brightness-50 justify-center pb-2'>+</button>
                      </div>
                      <div className='mt-5 flex flex-row'><div className='flex mb-3 flex-col'><h1 className='font-semibold w-24 mr-7'>Children</h1><h2 className='text-slate-200 text-xs'>Between 2-12 yrs</h2></div> <button onClick={() => chmin('c')} className='w-8 h-9 border-r-0 text-4xl flex flex-row items-center justify-center pb-3 bg-white bg-opacity-5 shadow-lg hover:scale-110 hover:brightness-50'>-</button> <input className='flex h-9 flex-row w-8 text-center' readOnly value={ccount}></input> <button onClick={() => { chadd('c') }} className='w-8 h-9 bg-opacity-5 bg-white shadow-xl text-2xl flex flex-row items-center hover:scale-110 hover:brightness-50 justify-center pb-2'>+</button>
                      </div>
                      <div className='mt-5 flex flex-row'><div className='flex mb-3 flex-col'><h1 className='font-semibold w-24 mr-7'>Infants</h1><h2 className='text-slate-200 text-xs'>Below 2 yrs</h2></div> <button onClick={() => chmin('i')} className='w-8 h-9 border-r-0 text-4xl flex flex-row items-center justify-center pb-3 bg-white bg-opacity-5 shadow-lg hover:scale-110 hover:brightness-50'>-</button> <input className='flex h-9 flex-row w-8 text-center' readOnly value={icount}></input> <button onClick={() => { chadd('i') }} className='w-8 h-9 bg-opacity-5 bg-white shadow-xl text-2xl flex flex-row items-center hover:scale-110 hover:brightness-50 justify-center pb-2'>+</button>
                      </div>
                    </div>
                    <div className=' ml-28 h-44 border-l-2 border-purple-400 flex flex-col'>
                      <div className="flex items-center mt-1 ml-5">
                        <input onClick={() => setOpt('Economy')} defaultChecked type="radio" name="radio" className="w-4 h-4 accent-blue-600 " />
                        <label className="ms-2 text-lg font-medium text-white">Economy</label>
                      </div>
                      <div className="flex items-center mt-7 ml-5">
                        <input onClick={() => setOpt('Premium Economy')} type="radio" name="radio" className="w-4 h-4 accent-blue-600" />
                        <label className="ms-2 text-lg font-medium text-white">Premium Economy</label>
                      </div>
                      <div className="flex items-center mt-7 ml-5">
                        <input onClick={() => setOpt('Business')} type="radio" name="radio" className="w-4 h-4 accent-blue-600" />
                        <label className="ms-2 text-lg font-medium text-white">Business</label>
                      </div>
                    </div>
                  </div>
                  <button ref={dbtton} className='w-28 text-white mt-3 self-end mr-10 bg-blue-700 h-10 rounded-3xl hover:scale-110 hover:bg-brightness-75 ' >Done</button>
                </div>
              </div>
              <input type='date' min={(new Date()).toISOString().split('T')[0]} className=" rounded-md border border-gray-300 h-14 w-40 ml-3 mt-3 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={selectedDate1.toISOString().split('T')[0]}
                onChange={handleDateChange1} />
              <input type='date' min={selectedDate1.toISOString().split('T')[0]} className={` rounded-md  h-14 w-0 ml-0 mt-3  text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-translate duration-300 ease-in-out transform ${rtrip ? 'w-40 ml-7 py-2 px-3 border border-gray-300' : ''}`}
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange} />
              <button onClick={() => {if(from&&to){navigate(`/flights?f=${fiata}&t=${tiata}&tway=${rtrip}&p=${acount}-${ccount}-${icount}&ty=${opt}&dd=${selectedDate1.toISOString().split('T')[0]}&ad=${(selectedDate.toISOString().split('T')[0]) || ' '}`)}else{window.alert("Enter From And To")}}} className='w-28 text-white mt-3 ml-3 font-semibold bg-purple-700 h-14 rounded-md hover:scale-110 hover:bg-brightness-75 '>Search</button>

            </div>
          </div>
        </div>
        <img src={image} alt="" className='w-[100vw] ' />
      </div>
    </>
  )
}

export default Home
