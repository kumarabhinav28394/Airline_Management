import { useState } from "react";
import { useEffect } from "react";
const PassengerInfo = (props) => {

    const [passenger_info, setPassengerInfo] = useState({
        name: "",
        gender: "male",
        mail: "",
        number: "",
        age:0,
        seat:''
    });

    const [isadding,setIsadding]=useState(false)
    useEffect(()=>{
        if(props.prev_passenger_info){
            if(isadding){
          
        setPassengerInfo(Object.assign(props.prev_passenger_info,{seat:''}));
        props.setAddTravellers()
        handleChange(props.prev_passenger_info)
        setIsadding(false)}
    }
    },[props.prev_passenger_info])
    const handleChange=(data)=>{
        var arr=props.passenger_info_list
        
        arr[props.num-1]=data
        
        props.setPassengerInfoList(arr)
    }
    const handleClear = () => {
        setPassengerInfo({
            name: "",
            gender: "male",
            mail: "",
            number: "",
            age:0,
            seat:''
        })
        handleChange()
    };

    return (
        <div className="flex bg-gradient-to-r from-blue-400 to-teal-500 hover:opacity-80 shadow-lg shadow-gray-700 flex-col items-centre justify-center gap-6 border-2 border-purple-400 rounded-xl pt-7 pb-7">

            <div className="flex justify-around">
                <div className="text-2xl text-white font-semibold">Passenger {props.num}</div>
                <div>
                    <button className="border-2 bg-white border-gray-600 rounded-lg p-1 hover:cursor-pointer mr-3" onClick={()=>{props.setIspop3(true);setIsadding(true); }}>Add Saved Travellers' Info</button>
                    <button className="border-2 bg-white border-gray-600 rounded-lg p-1 hover:cursor-pointer mr-3" onClick={()=>{handleClear()}} >Clear</button>
                </div>
            </div>

            <div className="flex flex-col gap-4 ml-8">
                <div>
                    <label className="p-7 text-gray-700 text-lg">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="border-2 border-gray-600 rounded-lg p-1"
                        placeholder="Mark Twain"
                        value={passenger_info.name}
                        onChange={(e) => {setPassengerInfo({ ...passenger_info, name: e.target.value });handleChange({ ...passenger_info, name: e.target.value })}}
                    />
                </div>

                <div>
                    <label className="p-7 text-gray-700 text-lg">Gender</label>
                    <select
                        name="gender"
                        className="border-2 border-gray-600 rounded-lg p-1"
                        value={passenger_info.gender}
                        onChange={(e) => {setPassengerInfo({ ...passenger_info, gender: e.target.value });handleChange({ ...passenger_info, gender: e.target.value })}}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="p-7 text-gray-700 text-lg">Age</label>
                    <input
                        type="number"
                        name="age"
                        className="border-2 border-gray-600 rounded-lg p-1"
                        placeholder="18"
                        value={passenger_info.age}
                        onChange={(e) => {setPassengerInfo({ ...passenger_info, age: e.target.value });handleChange({ ...passenger_info, age: e.target.value })}}
                    />
                </div>
                <div>
                    <label className="p-7 text-gray-700 text-lg">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="border-2 border-gray-600 rounded-lg p-1"
                        placeholder="Lh7oN@example.com"
                        value={passenger_info.mail}
                        onChange={(e) => {setPassengerInfo({ ...passenger_info, mail: e.target.value });handleChange({ ...passenger_info, email: e.target.value })}}
                    />
                </div>

                <div>
                    <label className="p-7 text-gray-700 text-lg">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="border-gray-600 border-2 rounded-lg p-1"
                        placeholder="1234567890"
                        value={passenger_info.number}
                        onChange={(e) => {setPassengerInfo({ ...passenger_info, number: e.target.value });handleChange({ ...passenger_info, phone: e.target.value })}}
                    />
                </div>
            </div>
        </div>
    );
}

export default PassengerInfo;