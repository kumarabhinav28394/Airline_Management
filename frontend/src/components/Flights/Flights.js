import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import FlightDetail from './FlightDetail'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import api from '../API/api'

// import { useEffect } from 'react'
// import data from './data'
 
import { useState } from 'react'
const Flights = () => {
  const[searchParam,setSearchParams]=useSearchParams()
  const from=searchParam.get('f')
  const to=searchParam.get('t')
  const way=searchParam.get('tway')
  const [eld,chi,inf]=searchParam.get('p').split('-')
  const type=searchParam.get('ty')
  const dept=searchParam.get('dd')
  const arr=searchParam.get('ad')
  const df=searchParam.get('df')
  // const [DataF,setData] = useState({data});
  // console.log(data);
  // setData(data);
  let min = 0;
  let max = 100000;
  
  
  const [Em,setEm] = useState(false);
  const [Mo,setMo] = useState(false);
  const [Af,setAf] = useState(false);
  const [Ni,setNi] = useState(false);
  const [upperLimit,setLimit] = useState(1000000);
 const navigate=useNavigate()

// const data = [
//  const Data= [{
//       flightInfo : "IndiGo | 6E-1058 | 6E-713",
//       from : "BKK",
//       departure : "06:40",
//       duration : "7h 25m",
//       stops : 0,
//       to : "PAT",
//       arrival : "08:35",
//       price : 58000,
//       priceInfo : "",
//   },{
//     flightInfo : "IndiGo | 6E-1058 | 6E-713",
//     from : "BKK",
//     departure : "05:40",
//     duration : "7h 25m",
//     stops : 0,
//     to : "PAT",
//     arrival : "08:35",
//     price : 58000,
//     priceInfo : "",
// },{
//   flightInfo : "Air India| 6E-1058 | 6E-713",
//   from : "BKK",
//   departure : "12:40",
//   duration : "7h 25m",
//   stops : 0,
//   to : "PAT",
//   arrival : "08:35",
//   price : 58000,
//   priceInfo : "",
// }];
const [data,setData] = useState([]);
const [data2,setData2] = useState([]);

  useEffect(()=>{
      mainHandler();
  },[Em,Mo,Af,Ni,upperLimit]);
useEffect(()=>{
  api.post('/api/getflights',{from:from,to:to,date:dept,premium:(type==='Economy')?false:true}).then((res)=>{setData(res.data.arr);setData2(res.data.arr)}).catch((err)=>{console.log(err)})

},[from])
function isTimeRange(range,time){
  const [startTime, endTime] = range;

  // Compare the time with the range
  if (startTime <= endTime) {
    return time >= startTime && time <= endTime;
} else {
    // Handle cases where the range spans midnight
    return time >= startTime || time <= endTime;
}
}


function mainHandler(){
  // let dummyData = [];
  let dummyData = [];
  if(Em){
    
    for(const obj of data2){
      
        if(isTimeRange(["00:00","06:00"],obj.dept_time))
          dummyData.push(obj);
    }
  }

  if(Mo){
    for(const obj of data2){
        if(isTimeRange(["06:00","12:00"],obj.dept_time))
          dummyData.push(obj);
    }
  }

  if(Af){
    for(const obj of data2){
        if(isTimeRange(["12:00","18:00"],obj.dept_time))
          dummyData.push(obj);
    }
  }

  if(Ni){
    for(const obj of data2){
        if(isTimeRange(["18:00","24:00"],obj.dept_time))
          dummyData.push(obj);
    }
  }

  if(!Em && !Mo && !Af && !Ni){
    let dummyData2 = [];
    for(const obj of data2){
        if(obj.price <= upperLimit){
            dummyData2.push(obj);
        }
    }
    setData(dummyData2);
  }
  else{
    let dummyData3 = [];
    for(const obj of dummyData){
      if(obj.price <= upperLimit){
        dummyData3.push(obj);
      }
    }
    setData(dummyData3);
  }
  
}
function handleSlider(e){
    setLimit(e.target.value);
}
function clickHandler1(e){
  
    if(e.target.checked){
      setEm(true);
    }
    else{
      setEm(false);
    }
    
}

function clickHandler2(e){
  if(e.target.checked){
    setMo(true);
  }
  else{
    setMo(false);
  }
  
}

function clickHandler3(e){
  if(e.target.checked){
    setAf(true);
  }
  else{
    setAf(false);
  }
  
}

function clickHandler4(e){
    if(e.target.checked){
      setNi(true);
    }
    else{
      setNi(false);
    }
    
}

function resetHandler(){
  setEm(false);
  setMo(false);
  setAf(false);
  setNi(false);
  setLimit(max);
}




  return (

  <div className='bg-gray-100 h-[100vh]'>
      <Navbar></Navbar>
      <div className='h-[4.2rem]'></div> 

      <div className='flex flex-row'>
      <div className='mt-2 ml-40 w-[300px] h-[400px] shadow-md bg-zinc-50 rounded flex flex-col'>
      
        <div className='flex flex-row place-content-between p-4 pt-5 border-b-[1px]
        border-gray-700'>
            <div className='text-xl font-medium'>Filter By</div>
            <button className='text-blue-600 font-medium text-sm' onClick={resetHandler}>Reset All</button>
        </div>

        <div className='border-b-[1px] border-gray-700 pb-4'>
          <div className='p-4 pt-2 text-md font-medium text-black'>
            Departure from {from}
          </div>

            <div className='flex flex-col items-start pl-4 gap-y-2'>
              <div className='flex flex-row gap-x-2'>
                <input type="checkbox" className='h-[20px] w-[20px] hover:cursor-pointer' checked={Em} onClick={clickHandler1} />
                <div className='flex flex-row space-x-24 justify-center'>
                  <div className='flex justify-center'>
                    Early Morning
                  </div>
                  <div className='text-xs'>
                    12am-6am
                  </div>
                </div>
              </div>
              
              
              <div className='flex flex-row gap-x-2'>
                <input type="checkbox" className='h-[20px] w-[20px] hover:cursor-pointer' checked={Mo} onClick={clickHandler2}/>
                <div className='flex flex-row gap-x-32 justify-center'>
                  <div className='flex justify-center'>
                    Morning
                  </div>
                  <div className='text-xs'>
                    6am-12pm
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-x-2'>
                <input type="checkbox" className='h-[20px] w-[20px] hover:cursor-pointer'  checked={Af} onClick={clickHandler3}/>
                <div className='flex flex-row space-x-28 justify-between'>
                  <div className='flex justify-center'>
                    Afternoon
                  </div>
                  <div className='text-xs'>
                    12pm-6pm
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-x-2'>
                <input type="checkbox" className='h-[20px] w-[20px] hover:cursor-pointer' checked={Ni} onClick={clickHandler4}/>
                <div className='flex flex-row space-x-32 justify-center'>
                  <div className='flex justify-center'>
                    Night
                  </div>
                  <div className='text-xs'>
                    6pm-midnight
                  </div>
                </div>
              </div>




            </div>
            
          

        </div>

            
          <div className='mt-3'>
            <div className='pl-3 font-medium'>Price from {from}</div>
            <div className='pl-6 mt-3'>
                <input type="range" min={min} max={max} value={upperLimit} step="1" className='w-[250px] checked:bg-blue-600 h-[30px] hover:cursor-pointer ' onChange={handleSlider}/>
            </div>
            <div className='pl-3 text-sm font-medium'>
                  Price(less than) : &#8377;{upperLimit}
            </div>
            
          </div>
          


      </div>
        <div className='mt-12 w-[900px]  mr-2 ml-4 '>
        {from&&((!df)?<h1 className='text-2xl font-semibold ml-4'>Select Departure Flight</h1>:<h1 className='text-2xl font-semibold ml-4'>Select Arrival Flight</h1>)}
           <div className="h-[50px] mt-4 w-[900px] mr-2 ml-4 shadow-md bg-zinc-50 flex flex-row items-center pl-2 rounded font-medium">{from} &rarr; {to}</div>
            
           
            
            {
              data.length > 0 ? data.map((item,index)=>(
              (((new Date(dept+'T'+item.dept_time)).getTime()-(new Date()).getTime()>1000*60*60*6)&&<FlightDetail data={{...data[index]}} eld={eld} type={type} way={way} arr={arr} df={df} from={to} to={from} chi={chi} inf={inf} setSearchParams={setSearchParams} ></FlightDetail>))):
              (
                <div className='hover:border-sky-600 shadow-md hover:border-2 rounded mt-2 mr-2 ml-4 w-[905px] h-[400px] flex flex-col gap-x-2 justify-center items-center text-3xl font-medium'>
                    <div> No FLights Found! </div>
                    <div className='text-sm mt-3'>Try changing some of your fliters</div>
                </div>
            )}
            
            
             
            
      </div>
    </div>
    {/* <div>
      From= {from}
      To={to}
      Elder={eld}
      Children={chi}
      Infants={inf}
      Type={type}
      Departure On={dept}
      {(way==='true')&&<>Arrival On={arr}</>}
      </div>       */}
  </div>
  )
}

export default Flights
