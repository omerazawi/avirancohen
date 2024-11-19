import axios from 'axios';
import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { formatDateForDisplay } from '../Data/formatDate';
import '../Styles/confirmation.css'
import Confirm from '../components/Confirm';
import emailjs from 'emailjs-com';


export default function Confirmation() {
  const [isConfirm, setIsConfirm] = useState(false);
  const location = useLocation();
  const { userInfo } = location.state || {}; 

  const formattedDate = userInfo?.selectedDate instanceof Date
    ? userInfo.selectedDate.toLocaleDateString('he-IL')
    : userInfo?.selectedDate;


    const sendEmail = (orderDetails) => {
      emailjs.send('service_ss4b18p', 'template_h9st96l', {
        name: orderDetails.Name,
        lastName: orderDetails.LastName,
        time:orderDetails.SlotSelect.slot,
        date: formattedDate,
        phoneNumber: orderDetails.phoneNumber,
      }, '3jCPuAkCOi-XiqANT')
      .then((result) => {
        console.log(result.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    };
    
  const handleConfirm = async () => {
    const formateDate = formatDateForDisplay(userInfo.selectedDate);

    try {
      const response = await axios.post(`https://aviran-1.onrender.com/DayBook/timeslots/book`, {
        date: formateDate,
        time: userInfo.SlotSelect.slot,
        bookedBy: {
          Name: userInfo.Name,
          phoneNumber: userInfo.phoneNumber,
          lastName: userInfo.LastName,
        }
      });
      setIsConfirm(true);
      sendEmail(userInfo);
    } catch (error) {
      console.error('Error booking time slot:', error);
    }
  };

  return (
    <div className='confirm-container'>
      {isConfirm ? (
        <Confirm />
      ) : (
        <div className='slot-data'>
          <h1 className='slot-data-title'>אז קבענו?</h1>
          <div className='slot-lable-container'>
          <div className='slot-lable'>
         <h4 className='lable'>שם:</h4>
         <p>{userInfo.Name} {userInfo.LastName}</p>
         </div>
            <div className='slot-lable'>
          <h4 className='lable'>תאריך: </h4>
          <p>{formattedDate}</p>
          </div>
          <div className='slot-lable'>
          <h4 className='lable'>שעה:</h4>
          <p>{userInfo.SlotSelect.slot}</p>
          </div>
          </div>
          <button className='confirm-btn' onClick={handleConfirm}>לאישור התור</button>
        </div>
        
      )}
    </div>
  );
}
