import React,{useContext} from 'react';
import {AdminContext} from '../Context/AdminContext'
import '../Styles/Alert.css';

export default function Alert() {
    const {message,setMessage} = useContext(AdminContext);

  return (
    <div className='alert-container'>
        <div className='alert'>
            <p>{message}</p>
            <button onClick={() => setMessage('')}>אישור</button>
            </div>
   
    </div>
  )
}
