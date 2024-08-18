import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'
import { useRef } from 'react'
import edit from './edit.png'
import imgupi from '../Login/user.jpg'
import Navbar from '../Navbar/Navbar'
import api from '../API/api'
const Profile = () => {
  const navigate = useNavigate()
  const box = useRef()
  const [oldp,setOldp]=useState('')
  const [newp,setNewp]=useState('')
  const [rep,setRep]=useState('')
  const [ispop, setIspop] = useState(false)
  const [ispop2, setIspop2] = useState(false)
  const [ispop3, setIspop3] = useState(false)
  const [ispop4, setIspop4] = useState(false)
  const [otp, setOtp] = useState('')
  const [inc, setInc] = useState(false)
  const [name, setName] = useState('')
  const [username, setUserName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [adress, setAdress] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [number, setNumber] = useState('')
  const [namep, setNamep] = useState(name)
  const [birthdayp, setBirthdayp] = useState(birthday)
  const [genderp, setGenderp] = useState(gender)
  const [adressp, setAdressp] = useState(adress)
  const [pincodep, setPincodep] = useState(pincode)
  const [statep, setStatep] = useState(state)
  const [numberp, setNumberp] = useState(number)
  const [mailk, setMailk] = useState('')
  const [numberk, setNumberk] = useState('')
  const [namek, setNamek] = useState('')
  const [genderk, setGenderk] = useState(gender)
  const [mail, setMail] = useState('')
  const [age,setAge]=useState()
  const [travellers,setTravellers]=useState([])
  const [img,setImg]=useState('')
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
          
          setName(res.data.name);
          setMail(res.data.usermail);
          setAdress(res.data.address);
          setBirthday(res.data.birthday);
          setGender(res.data.gender);
          setNumber(res.data.number);
          setPincode(res.data.pincode);
          setState(res.data.state);
          setTravellers(res.data.travellers);
          setUserName(res.data.username);
          setImg(res.data.image)

        } else {
          localStorage.removeItem('token')
          navigate("/")

        }
      }).catch((err) => {
        localStorage.removeItem('token')
        navigate("/")

      })
    }
  }
  useEffect(() => check(), [])

  const imgup=(e)=>{
    var reader= new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      api.post('/api/user/image',{username:username,image:reader.result}).then((res)=>{if(res.data.success){setImg(reader.result)}}).catch((err)=>console.log(err))
    }
    reader.onerror=(error)=>{
      console.log(error)
    }

  }

  const handleMail = () => {
    api.get("/sendMail").then((res) => {
      if (res.data.success) {
        
      }
    }).catch((err) => { console.log(err) })
  }
  const checkOtp = () => {
    api.post('/sendMail/check', { mail: "piyushverma5343@gmail.com", otp: otp.toString() }).then((res) => {
      if (res.data.success) {
        
      }
    }).catch((err) => { console.log(err); setInc(true) })
  }
  const posting=(data)=>{
    
    api.post('/api/user/update',data).then((res)=>check()).catch((err)=>console.log(err))
  }
  const changep=()=>{
    if(newp===''){
      window.alert("Please enter valid new password ")
      return
    }
    if((newp!==rep)){
      window.alert("New password and re-entered password are different")
      return
    }
    const data={username:username,
      oldpass:oldp,
      newpass:newp
    }
    
    api.post("/api/user/update/pass",data).then((res)=>{if(res.data.success){setIspop3(false)}}).catch((err)=>{window.alert("Enter Correct Password")})
  }
  return (<>
  <Navbar/>
  <div className='h-16'></div>
    {ispop && <div on onClick={(e) => {const r=box.current; if (!(e.target===box.current||r.contains(e.target))) { setIspop(false) } }} className=' flex z-10 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
      <div ref={box} className='bg-white w-[33vw] rounded-xl shadow-lg shadow-gray-600 p-5 gap-0 grid grid-cols-2 h-[65vh]'>
        <h1 className='text-2xl font-semibold'>Edit Profile</h1><h1></h1>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Name</label>
        <input type='text' value={namep} onChange={(e)=>{setNamep(e.target.value)}} className='w-48 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Gender</label>
        <input type='text'value={genderp} onChange={(e)=>{setGenderp(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Birth Date</label>
        <input type='date' value={birthdayp} onChange={(e)=>{setBirthdayp(e.target.value.toString())}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Address</label>
        <input type='text' value={adressp} onChange={(e)=>{setAdressp(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Pin Code</label>
        <input type='text' value={pincodep} onChange={(e)=>{setPincodep(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>State</label>
        <input type='text' value={statep} onChange={(e)=>{setStatep(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Phone Number</label>
        <input type='text' value={numberp} onChange={(e)=>{setNumberp(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <h1></h1>
        <div className='h-32 flex flex-row justify-center'>
          <button onClick={()=>{setName(namep); setGender(genderp); setBirthday(birthdayp) ; setAdress(adressp); setPincode(pincodep) ; setState(statep); setNumber(numberp); 
            const  data={
              usermail:mail,
              name:namep,
              number:numberp,
              pincode:pincodep,
              address:adressp,
              state:statep,
              travellers:travellers,
              gender:genderp,
              birthday:birthdayp,
            };
            posting(data);
            
            setIspop(false)}} className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Edit</button>

        </div>
        <div className='h-72 flex flex-row justify-center'>
          <button onClick={()=>setIspop(false)} className='w-28 h-10 bg-white text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>

        </div>
      </div>
      
    </div>}
    {ispop2 && <div onClick={(e) => {const r=box.current; if (!(e.target===box.current||r.contains(e.target))) { setIspop2(false) } }} className=' flex z-10 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
      <div ref={box} className='bg-white w-[33vw] rounded-xl shadow-lg shadow-gray-600 p-5 gap-0 grid grid-cols-2 h-[55vh]'>
        <h1 className='text-2xl font-semibold'>Edit Profile</h1><h1></h1>
        <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Name</label>
        <input type='text' value={namek} onChange={(e)=>{setNamek(e.target.value)}} className='w-48 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
        <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Gender</label>
        <input type='text'value={genderk} onChange={(e)=>{setGenderk(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Phone Number</label>
        <input type='text' value={numberk} onChange={(e)=>{setNumberk(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Age</label>
        <input type='number' value={age} onChange={(e)=>{setAge(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
       

          <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Mail</label>
        <input type='text' value={mailk} onChange={(e)=>{setMailk(e.target.value)}} className='w-48 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div></div>
        <div className='h-32 flex flex-row justify-center'>
          <button onClick={()=>{const trav={name:namek, mail:mailk, number:numberk, gender:genderk,age:age} ;
          const data={
            usermail:mail,
            name:name,
            number:number,
            pincode:pincode,
            address:adress,
            state:state,
            
            travellers:[...travellers,trav],
            gender:gender,
            birthday:birthday,
          }
          posting(data); setIspop2(false)} } className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Add</button>

        </div>
        <div className='h-72 flex flex-row justify-center'>
          <button onClick={()=>setIspop2(false)} className='w-28 h-10 bg-white text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>

        </div>
      </div>
      
    </div>}
    {ispop3&&<div onClick={(e) => {const r=box.current; if (!(e.target===box.current||r.contains(e.target))) { setIspop3(false) } }} className=' flex z-10 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
    <div ref={box} className='bg-white w-[30vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[55vh]'>
    <h1 className='text-2xl self-start font-semibold'>Edit Password</h1>
    <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Old Password</label>
        <input type='text' value={oldp} onChange={(e)=>{setOldp(e.target.value)}} className='w-72 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
        <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>New Password</label>
        <input type='text'value={newp} onChange={(e)=>{setNewp(e.target.value)}} className='w-72 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
        <div className='flex h-24 flex-col p-1'>
          <label className='font-semibold'>Re-enter Password</label>
        <input type='text' value={rep} onChange={(e)=>{setRep(e.target.value)}} className='w-72 px-2 border-[1px] rounded-sm border-gray-500 border-solid h-10'/></div>
       <div  className='flex flex-row ml-28 w-full h-14'><button onClick={()=>changep()} className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Change</button>
       <button onClick={()=>setIspop3(false)} className='w-28 h-10 bg-white ml-14 text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>

       </div>
      </div>
      </div>}
      {ispop4&&<div onClick={(e) => {const r=box.current; if (!(e.target===box.current||r.contains(e.target))) { setIspop3(false) } }} className=' flex z-10 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
    <div ref={box} className='bg-white w-[30vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[30vh]'>
    <h1 className='text-3xl self-center font-semibold'>Are You Sure?</h1>
    
       <div  className='flex mt-14 flex-row ml-28 w-full h-14'><button onClick={()=>{localStorage.removeItem('token');navigate('/')}} className='w-28 h-10 bg-red-500 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Logout</button>
       <button onClick={()=>setIspop4(false)} className='w-28 h-10 bg-white ml-14 text-gray-300 hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>

       </div>
      </div>
      </div>}
    <div className='flex px-32 py-16 flex-row bg-gradient-to-r from-purple-500 to-pink-500'>

      {/* <div className='cursor-pointer' onClick={()=>handleMail()}>
      Verify Email </div>
      <input type='text' placeholder='Enter OTP here' onChange={(e)=>{setOtp(e.target.value)}} value={otp} />
      <button onClick={()=>{checkOtp()}}>Submit</button>
      {inc&&<div className='text-red-500'>Incorrect otp try again</div>}
       */}
      <div className='sticky flex mt-4 flex-col items-center top-24 rounded-2xl mr-10 w-[28vw] h-[60vh] p-3 bg-white'>
        <div><img  src={img ? img:imgupi} className='w-48 relative mt-2 h-48 rounded-xl' />
        <label className="" for="upload"><img src={edit} className='absolute ml-[11.8vw] bg-white -mt-4 cursor-pointer h-4 w-4'/></label>
        <input type='file' onChange={(e)=>imgup(e)} accept='image/*' id='upload' className='w-0  absolute ml-[11.8vw] bg-white -mt-4 h-0 rounded-sm'/></div>
        <ul className='mt-3 flex flex-col items-start w-[17vw] '>
          <Link className='text-md mb-2 cursor-pointer font-semibold rounded-md px-3 active:bg-blue-200 w-full h-11 flex items-center '
            activeClass="bg-blue-200 text-blue-600"
            to="profile"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
            
          >
            Profile
          </Link>
          <Link className='text-md mb-2 cursor-pointer font-semibold rounded-md px-3 transition-all duration-300 ease-in-out active:bg-blue-200 w-full h-11 flex items-center '
            activeClass="bg-blue-200 text-blue-600"
            to="login"
            spy={true}
            smooth={true}
            offset={-220}
            duration={500}

          >
            Login Details
          </Link>
          <Link className='text-md mb-2 cursor-pointer font-semibold transition-all duration-300 ease-in-out rounded-md px-3 active:bg-blue-200 w-full h-11 flex items-center '
            activeClass="bg-blue-200 text-blue-600"
            to="saved"
            spy={true}
            smooth={true}
            offset={-250}
            duration={500}

          >
            Saved Travellers
          </Link>
          <Link onClick={()=>setIspop4(true)} className='text-md mb-2 cursor-pointer font-semibold transition-all duration-300 ease-in-out rounded-md px-3 active:bg-blue-200 w-full h-11 flex items-center '
          >
            Logout
          </Link>
        </ul>
      </div>
      <div className=' flex flex-col  relative  w-full'>
        <div id='profile' className='w-full bg-white mt-4 mb-4 p-16 flex flex-col rounded-2xl border-2 border-solid border-gray-300 '>
          <div className='flex mb-6 flex-row'><h1 className='text-4xl font-semibold'>Profile</h1>
            <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Edit</button></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600' >Name</h1><h1 className='ml-20 font-semibold'>{!name ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : name}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600' >Phone no.</h1><h1 className='ml-20 font-semibold'>{!number ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : number}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Birthday</h1><h1 className='ml-20 font-semibold'>{!birthday ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : birthday}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Gender</h1><h1 className='ml-20 font-semibold'>{!gender ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : gender}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Address</h1><h1 className='ml-20 font-semibold'>{!adress ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : adress}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Pin Code</h1><h1 className='ml-20 font-semibold'>{!pincode ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : pincode}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>State</h1><h1 className='ml-20 font-semibold'>{!state ? <button onClick={() => { setIspop(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-24 rounded-full'>Add</button> : state}</h1></div>

          </div>
          <div id='login' className='w-full bg-white mt-4 mb-4 p-16 flex flex-col rounded-2xl border-2 border-solid border-gray-300 '>
          <div className='flex mb-6 flex-row'><h1 className='text-4xl font-semibold'>Login Details</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Mail</h1><h1 className='ml-20 font-semibold'>{mail}</h1></div>
            <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Password</h1><h1 className='ml-20 font-semibold'>{<button onClick={() => { setIspop3(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-40 rounded-full'>Change Password</button>}</h1></div>
          
          </div>
          <div id='saved' className='w-full bg-white mt-4 mb-4 p-16 flex flex-col rounded-2xl border-2 border-solid border-gray-300 '>
          <div className='flex mb-6 flex-row'><h1 className='text-4xl font-semibold'>Saved Travellers</h1><button onClick={() => { setIspop2(true) }} className='text-blue-500 h-11 mr-20 ml-auto p-2 hover:brightness-75 hover:shadow-sm hover:shadow-black transition-all duration-300 ease-in-out border-gray-200 border-2 w-40 rounded-full'>Add Traveller</button></div>
            {travellers&&travellers.map((item,index)=>(<div className='mt-4 flex flex-col'>
              <h1 className='text-xl font-semibold ml-auto mr-auto'>Taveller {index+1}</h1>
               <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600' >Name</h1><h1 className='ml-20 font-semibold'>{item.name}</h1></div>
               <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Mail</h1><h1 className='ml-20 font-semibold'>{item.mail}</h1></div>
               <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600' >Age</h1><h1 className='ml-20 font-semibold'>{item.age}</h1></div>
               <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600' >Phone no.</h1><h1 className='ml-20 font-semibold'>{item.number}</h1></div>
               <div className='w-full flex px-6 items-center flex-row h-14 bg-white hover:bg-gradient-to-r from-white to-gray-200 border-b-2 border-gray-200'><h1 className='w-20 text-gray-600'>Gender</h1><h1 className='ml-20 font-semibold'>{item.gender}</h1></div>
               </div>))}
          </div>
        </div>
      </div>
    </>
    )
}

    export default Profile
