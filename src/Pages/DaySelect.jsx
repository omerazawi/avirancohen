import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { FaArrowRight } from "react-icons/fa";
import { ClientContext } from '../Context/ClientContext';
import 'react-calendar/dist/Calendar.css';
import '../Styles/DaySelecet.css';
import SelectHour from '../components/SelectHour';
import Loading from '../components/Loading';

export default function DaySelect() {
  const { isLoading,selectedDate, handleSelectedDate, Message, Slots,ShowDaySelect } = useContext(ClientContext);

  return (
    <div className='dayselect-container'>
      <h3 className='dayselect-title'>בחר תאריך ושעה</h3>
      <Calendar
        className='calendar'
        locale="he-IL"
        value={selectedDate} 
        onChange={handleSelectedDate}
      />
      {ShowDaySelect}
{isLoading ? (
  <Loading />
) : (
  Slots && Slots.length > 0 ? (
    <SelectHour />
  ) : (
    <div>
    <p className='slot-message'>{Message}</p>
    <Link className='slot-back-button' to='/' ><FaArrowRight />חזרה למסך הבית</Link>
    </div>
  )
)}
    </div>
  );
}
