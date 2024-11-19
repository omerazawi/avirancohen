
import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { MdDelete } from "react-icons/md";
import '../Styles/Admin.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from 'react-calendar';
import AdminMessage from '../components/AdminMessage';

export default function Admin() {
  const {
    PutMessage,
    setPutMessage,
    formattedDay,
    formattedDate,
    selectedDate,
    handleSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    generateTimeRange,
    timeRange,
    removeTimeSlot,
    SaveDateAndHoures,

  } = useContext(AdminContext);

  return (
    <div className='admin-container'>
      {PutMessage && <AdminMessage setPutMessage={setPutMessage} />}
      <h1 className='admin-title'>ניהול יומן</h1>
      <h2 className='admin-day'>{formattedDay}</h2>
      <h3 className='admin-date'>{formattedDate}</h3>

      <div className='input-container'>
        <label>בחר תאריך:</label>
        <Calendar
          value={selectedDate}
          onChange={handleSelectedDate}
          locale="he-IL"
          className="input"
        />
      </div>

      <div className='booked-slots-list-container'>
        <h1 className='booked-slots-list-title'>תורים שנקבעו:</h1>
        { timeRange.filter(slot => !slot.isOpen).length > 0 ? (
  timeRange.filter(slot => !slot.isOpen).map((slot, index) => (
    <div className='slot' key={`${slot.time}-${index}`}>
      <div className='time-slot'>
        {slot.time}
      </div>
      <div className='status-slot'>
        {slot.bookedBy ? (
          <div className='status-ordered'>
            <p>הוזמן על ידי:</p>
            <p>{slot.bookedBy?.Name} {slot.bookedBy?.lastName}</p>
            <p>{slot.bookedBy?.phoneNumber}</p>
          </div>
        ) : (
          <p>התור פנוי</p>
        )}
      </div>
    </div>
  ))
) : (
  <p className='slot-message'>אין תורים שנקבעו ליום זה</p>
)}
      </div>

      <div className='input-container'>
        <label>שעת התחלה:</label>
        <DatePicker
          selected={startTime}
          onChange={time => setStartTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          timeCaption="שעת התחלה"
          className='input'
          placeholderText='הנכס שעת תחילת עבודה...'
        />
      </div>

      <div className='input-container'>
        <label>שעת סיום:</label>
        <DatePicker
          selected={endTime}
          onChange={time => setEndTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          timeCaption='שעת סיום'
          className='input'
          placeholderText='הנכס שעת סיום עבודה...'
        />
      </div>

      <button className='time-button' onClick={generateTimeRange}>עדכן שעות עבודה</button>
      
      <div className='slots-list-container'>
  {timeRange.length > 0 ? (
    timeRange.map((slot, index) => (
      <div className='slot' key={`${slot.time}-${index}`}>
        <div className='time-slot'>
          <MdDelete className='remove-slot' onClick={() => removeTimeSlot(slot.time)} />
          {slot.time}
        </div>
        <div className='status-slot'>
          {slot.isOpen ? (
            'התור פנוי'
          ) : (
            slot.bookedBy ? (  // Check if slot.bookedBy exists
              <div className='status-ordered'>
                <p>הוזמן על ידי:</p>
                <p>{slot.bookedBy.Name} {slot.bookedBy.lastName}</p>
                <p>{slot.bookedBy.phoneNumber}</p>
              </div>
            ) : (
              <p>הוזמן על ידי משתמש לא מזוהה</p>  // Fallback in case bookedBy is null
            )
          )}
        </div>
      </div>
    ))
  ) : (
    <p className='slot-message'>לא הוספתה שעות עבודה ליום זה</p>
  )}
</div>
  

      <button className='save-button' onClick={SaveDateAndHoures}>שמור תורים</button>
      <button className='put-message-btn' onClick={() => setPutMessage(true)}>עדכון הודעת מנהל</button>
    </div>
  );
}
