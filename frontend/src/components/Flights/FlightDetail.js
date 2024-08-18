
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
const FlightDetail = (props) => {

    const [ispop3, setIspop3] = useState(false)
    const box = useRef()
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (props.way === 'true') {
            if (props.df) {
                navigate(`/flights/one?id=${props.df}&df=${props.data.flight_id}&p=${props.eld}&t=${props.type}&w=${props.way}`)
            } else {
                //navigate(`/flights?f=${props.from}&t=${props.to}&tway=${props.way}&p=${props.eld}-${props.chi}-${props.inf}&ty=${props.type}&df=${props.data.flight_id}&dd=${props.arr}&ad=${ ' '}`)
                props.setSearchParams({ "f": props.from, 't': props.to, 'tway': props.way, 'p': props.eld + '-' + props.chi + '-' + props.inf, 'ty': props.type, 'df': props.data.flight_id, 'dd': props.arr, 'ad': '' })
            }
        } else {
            navigate(`/flights/one?id=${props.data.flight_id}&p=${props.eld}&t=${props.type}&w=${props.way}`)
        }
    }
    return (
        <>{ispop3 && <div onClick={(e) => { const r = box.current; if (!(e.target === box.current || r.contains(e.target))) { setIspop3(false) } }} className=' flex z-10 fixed top-0 left-0 py-10 h-full w-full overflow-scroll bg-black bg-opacity-20 items-center justify-center'>
            <div ref={box} className='bg-white w-[60vw] rounded-xl shadow-lg shadow-gray-600 px-8 py-5 flex flex-col h-auto'>
                <h1 className='text-2xl self-start font-semibold'>Reviews</h1>
                <div className='flex mt-1 flex-col p-1'>
                    {props.data.reviews && props.data.reviews.map((item, index) => (

                        <div key={index} className="hover:bg-gradient-to-r from-white to-gray-200 mt-3 flex p-2 pl-0 flex-col cursor-pointer transition-all duration-300 ease-in-out">
                            <div className="flex gap-2">{item.username}
                                {<div className='flex  font-semibold text-green-500 flex-row gap-1'>
                                    <div className="flex mt-1">{(item.rating >= 1) ? <FaStar /> : <FaRegStar />} {(item.rating >= 2) ? <FaStar /> : <FaRegStar />}{(item.rating >= 3) ? <FaStar /> : <FaRegStar />}{(item.rating >= 4) ? <FaStar /> : <FaRegStar />}{(item.rating >= 5) ? <FaStar /> : <FaRegStar />}
                                    </div>

                                </div>}
                            </div>
                            <div className="ml-10">{item.review}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>}
            <div className="hover:border-sky-600 shadow-md hover:border-2 rounded mt-2 mr-2 ml-4 w-[905px]">


                <div className="w-[900px] h-[125px]  bg-zinc-50   flex flex-row gap-x-10 place-content-evenly">

                    <div className="h-[125px] w-[150px] mt-3 p-3 pt-4  flex flex-col gap-y-2">
                        <img src={props.data.image} className="h-[3rem] w-[3rem] border-2 border-black" />


                        <p className="text-xs font-semibold">{props.data.flight_name + ' | ' + props.data.flight_id}</p>

                    </div>

                    <div className="flex flex-row gap-x-1">

                        <div className="h-[125px] w-[100px]  flex justify-center items-center flex-col ">

                            <div className="text-sm text-gray-600">{props.data.from}</div>
                            <div className="text-xl font-bold">{props.data.dept_time}</div>
                        </div>

                        <div className="h-[125px] w-[100px]  flex flex-col justify-center items-center">
                            <div className="text-gray-600 text-xs">{props.data.duration}</div>
                            <div className="w-[50px] border-2 border-dashed border-gray-500"></div>
                            <div className="text-gray-600 text-xs">Non stop</div>
                        </div>
                        <div className="h-[125px] w-[100px]  flex flex-col justify-center items-center">
                            <div className="text-gray-600 text-sm">{props.data.to}</div>
                            <div className="text-xl font-bold">{props.data.arr_time}</div>
                        </div>

                    </div>

                    <div className="h-[125px] w-[250px] mt-3 flex flex-col justify-center items-end p-2">
                        <div className="text-2xl font-semibold text-black">&#8377;{(props.type === 'Business') ? props.data.busiprice : (props.type === 'Premium Economy') ? props.data.premprice : props.data.price}</div>
                        <div className='flex mt-2 font-semibold text-green-500 flex-row gap-1'>{parseFloat(props.data.ratings.toFixed(2))} <div className="flex mt-1">{(props.data.ratings >= 1) ? <FaStar /> : <FaRegStar />} {(props.data.ratings >= 2) ? <FaStar /> : <FaRegStar />}{(props.data.ratings >= 3) ? <FaStar /> : <FaRegStar />}{(props.data.ratings >= 4) ? <FaStar /> : <FaRegStar />}{(props.data.ratings >= 5) ? <FaStar /> : <FaRegStar />}</div>

                        </div>
                        <div onClick={() => setIspop3(true)} className=" font-semibold hover:underline cursor-pointer text-amber-300">See reviews</div>
                    </div>

                    <div className="flex flex-row justify-center items-center w-[128px] ">
                        <button onClick={() => handleSubmit()} className="flex justify-center items-center h-[40px] w-[90px] rounded bg-orange-500 text-white font-bold">Book</button>
                    </div>
                </div >
            </div>
        </>
    )
}

export default FlightDetail;