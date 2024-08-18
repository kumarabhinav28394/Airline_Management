import { useState } from "react";
import PassengerInfo from "./PassengerInfo";



const Options = (props) => {

    

    return (
        <div className={`${!props.isSeats ? 'overflow-auto w-[60%]':'hidden'}`}>
            <div className="flex flex-col items-center mt-6 mb-6 gap-8">

                <div className="bg-gray-100 p-10  w-[90%] rounded-[2rem] border-pink-400 border-[3px] shadow-lg shadow-gray-600 flex flex-col items-centre gap-8">

                    {/* seat type */}
                    <div className="bg-gradient-to-r from-blue-400 to-teal-400 hover:opacity-80 flex flex-col shadow-lg shadow-gray-700 items-centre justify-center gap-6 border-2 border-purple-400 rounded-xl pt-7 pb-7">
                        <div className="text-2xl text-white font-semibold text-center">Seat Type</div>
                        <div className="flex justify-around">
                            <div>
                                {props.type==='Economy'&&<input name="seat" id="economy" type="radio" checked />}
                                {props.type!=='Economy'&&<input name="seat" id="economy" type="radio" disabled />}
                                <label className="text-lg p-2" for="economy">Economy</label>
                            </div>
                            <div>
                            {props.type==='Business'&&<input name="seat" id="business" type="radio" checked />}
                            {props.type!=='Business'&&<input name="seat" id="business" type="radio" disabled />}
                                <label className="text-lg p-2" for="business">Business</label>
                            </div>
                            <div>
                            {props.type==='Premium Economy'&&<input name="seat" id="first" type="radio" checked />}
                            {props.type!=='Premium Economy'&&<input name="seat" id="first" type="radio" disabled />}
                                <label className="text-lg p-2" for="first">Premium Economy</label>
                            </div>
                        </div>
                    </div>

                    {/* seat pref */}
                    <div className="flex flex-col bg-gradient-to-r from-blue-400 to-teal-500 hover:opacity-80 shadow-lg shadow-gray-700 items-centre justify-center gap-6 border-2 border-purple-400 rounded-xl pt-7 pb-7">
                        <div className="text-2xl text-white font-semibold text-center">Seat Preference</div>
                        <div className="flex justify-around">
                            <div>
                                <input name="seat-pref" id="aisle" type="radio" checked />
                                <label className="text-lg p-2" for="aisle">Aisle Seat</label>
                            </div>
                            <div>
                                <input name="seat-pref" id="window" type="radio" />
                                <label className="text-lg p-2" for="window">Window Seat</label>
                            </div>
                        </div>
                    </div>

                    {/* luggage allowed */}
                    <div className="flex flex-col bg-gradient-to-r from-blue-400 to-teal-500 hover:opacity-80 shadow-lg shadow-gray-700 items-centre justify-center gap-6 border-2 border-purple-400 rounded-xl pt-7 pb-7">
                        <div className="text-2xl text-white font-semibold text-center">Luggage Allowed</div>
                        <div className="flex justify-between">
                            <div className="ml-10 mr-10">
                                <div className="text-left text-lg">Cabin Baggage</div>
                                <div>7 Kgs (1 piece only) / Adult</div>
                            </div>
                            <div className="ml-10 mr-10">
                                <div className="text-right text-lg">Check-in Baggage</div>
                                <div>15 Kgs (1 piece only) / Adult</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* promo code */}
                {/* <div className="bg-gray-100 p-10 w-[90%] rounded-[2rem] border-pink-400 border-[3px] shadow-lg shadow-gray-600 flex flex-col items-centre gap-8">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg shadow-gray-700 flex flex-col items-centre justify-center gap-6 border-2 border-purple-400 rounded-xl pt-7 pb-7">
                        <div className="text-2xl text-white font-semibold text-center">Promo Code</div>
                        <div className="flex justify-center">
                            <select name="promocode" className="border-2 border-black w-52 rounded-lg p-1">
                                <option checked>None</option>
                                <option>CASHBK5</option>
                                <option>CASHBK10</option>
                                <option>SAVE6.9</option>
                                <option>GETKARMA</option>
                                <option>NISPA</option>
                                <option>ASIRPA</option>
                                <option>PHANTHM</option>
                                <option>KAMUY</option>
                            </select>
                        </div>
                    </div>
                </div> */}

                {/* passengers info */}
                <div className="bg-gray-100 p-10 w-[90%] rounded-[2rem] shadow-lg border-pink-400 border-[3px] shadow-gray-600 flex flex-col justify-center items-centre gap-8">
                    <div className="flex justify-center gap-6">
                        <div className="text-3xl  font-semibold">Number of Passengers</div>
                        <div className="flex justify-centre gap-4">
                            
                            <div className="text-3xl  font-semibold">{props.passengers_num}</div>
                           
                        </div>
                    </div>

                    {Array.from({ length: props.passengers_num }, (_, i) => i + 1).map(num => (
                        <PassengerInfo
                            key={num}
                            num={num}
                            prev_passenger_info={props.addtravellers}
                            passenger_info_list={props.passenger_info_list}
                            setPassengerInfoList={props.setPassengerInfoList}
                            setAddTravellers={props.setAddTravellers}
                            setIspop3={props.setIspop3}
                            
                            
                        />
                    ))}
                </div>

                {/* important info */}
                <div className="bg-gray-100 p-7 w-[90%] rounded-[2rem] border-pink-400 border-[3px] shadow-lg shadow-gray-600 flex flex-col items-centre gap-8">
                    <div className="flex shadow-lg shadow-gray-600 bg-gradient-to-r from-blue-400 to-teal-500 hover:opacity-80 flex-col items-centre justify-center gap-6  rounded-lg pt-7 pb-7">
                        <div className="text-3xl text-white font-semibold text-center">Important Information</div>
                        <div className="p-5">
                            <div className="text-xl font-semibold text-gray-700 mb-3">Check travel guidelines and baggage information below:</div>
                            <ul className="text-gray-700">
                                <li>Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.</li>
                                <li>Wearing a mask/face cover is no longer mandatory. However, all travellers are advised to do so as a precautionary measure.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Options;