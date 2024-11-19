import React,{useContext, useEffect,useState} from 'react'
import { ClientContext } from '../Context/ClientContext';
import axios from 'axios';
import { AiFillNotification } from "react-icons/ai";
import '../Styles/messeges.css'

export default function Messeges() {
  const [message, setMessage] = useState('');
  const {isLoading,setIsLoading} = useContext(ClientContext)

  useEffect(() => {
    const fetchMessage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://aviran-1.onrender.com/DayBook/Message');
        if (response.data) {
          setMessage(response.data.message); 
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching message:', err);
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [message]);

  return (
    <div className='Messeges-container'>
        <div className='messeges-title-container'>
        <AiFillNotification className='messeges-icon'/>    
        <h3 className='messeges-title'>הודעות</h3>
        </div>
{isLoading ? <p>טוען הודעות...</p> : <div className='messege'>
  {message ? <p>{message}</p> : <p>אין הודעות חדשות</p>}
       </div>}
    </div>
  )
}
