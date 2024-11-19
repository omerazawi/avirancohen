import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Confirm() {
    const navigate = useNavigate();
  return (
    <div className='isConfirm-container'>
        <h1 className='confirm-succseful'>התור נקבע בהצלחה</h1>
        <p onClick={() => navigate('/')}>חזרה לדף הראשי</p>
    </div>
  )
}
