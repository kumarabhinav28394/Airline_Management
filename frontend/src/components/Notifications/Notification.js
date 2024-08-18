
import React, { useState, useEffect } from 'react';
import api from '../API/api';
import { requestForToken, onMessageListener } from '../../firebase';
import { useNavigate } from 'react-router-dom'
import noti from './noti.jpg'
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [username,setUserName]=useState('')
  const [setnot,setSetnot]=useState(false)
  const navigate=useNavigate()
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
          
          
          setUserName(res.data.username);
          setNotifications(res.data.notifications)
          setUnreadCount(res.data.notifications.filter(n => !n.read).length);
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
  useEffect(() =>{ check();}, [])

    
    

  

  const markAsRead = async (index) => {
    let arr=notifications
    arr[index].read=true
    setNotifications(arr)
    try {
      await api.post(`api/user/markread`,{username:username,notarr:arr});
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  return (
    <div className="relative ml-auto">
      <button onClick={()=>setSetnot(!setnot)} className="text-white relative">
        <img src={noti} className='w-8 h-8 rounded-full transition-all duration-300 ease-in-out hover:shadow-sm hover:shadow-black hover:brightness-110 hover:scale-105' />
        {unreadCount > 0 && <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>}
      </button>
      {setnot&&<div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-20">
        {notifications&&notifications.map((notification,index) => (
          <div key={notification._id} className={`px-4 py-2 hover:bg-gradient-to-r from-white to-gray-200 border-b ${notification.isRead ? 'bg-gray-100' : 'bg-white'}`}>
            <p className="text-sm">{notification.message}</p>
            {!notification.read && (
              <button onClick={() => markAsRead(index)} className="text-blue-500 text-xs mt-1">
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Notification;
