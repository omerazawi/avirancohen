import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../Context/ClientContext';
import { MdDriveFileRenameOutline } from "react-icons/md";
import '../Styles/Form.css';
import { FaArrowRight } from "react-icons/fa";

export default function Form() {
  const navigate = useNavigate();
  const { Name, setName, LastName, setLastName, phoneNumber, setPhoneNumber, handleData,Message } = useContext(ClientContext);

  return (
    <div className='Form-container'>
      <form className='form' onSubmit={handleData}>
        <h4 className='Form-title'><MdDriveFileRenameOutline />מלא פרטים</h4>
        
        <div className='label-container'>
          <label>שם</label>
          <input 
            type='text' 
            placeholder='הכנס שם..' 
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='label-container'>
          <label>שם משפחה</label>
          <input 
            type='text'
            placeholder='הכנס שם משפחה..' 
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className='label-container'>
          <label>מס פלאפון</label>
          <input 
            type='tel'
            placeholder='הכנס מס פלאפון..' 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]*"
            minLength={10}
            inputMode="numeric"
          />
{Message && (
  <div className='message-container' >
   <p>*{Message}</p>
   <div className='message-navigator-container' onClick={() => navigate('/DayBook')}>
   <FaArrowRight className='navigator-icon' />
   <p className='message-navigator'>חזור לבחירת תאריך ושעה</p>
  </div>
  </div>
)}        </div>
        <button type="submit" className='SubmitButton'>
          הזמן תור
        </button>
      </form>
    </div>
  );
}
