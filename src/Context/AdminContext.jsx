import React,{useState,createContext} from "react";
import {formatDateForDisplay,getDayNameInHebrew,formatDateForTitle} from '../Data/formatDate';
import axios from "axios";

export const AdminContext = createContext();


export const AdminProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [formattedDay, setFormattedDay] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeRange, setTimeRange] = useState([]);
  const [message, setMessage] = useState('');
  const [PutMessage , setPutMessage] = useState(false);
  const [AdminMessage, setAdminMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const HandleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };


// -----------מחיקת תורים ישנים-----------
const removePastTimeSlots = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset the time to midnight for accurate comparison

    const formattedCurrentDate = formatDateForDisplay(currentDate); // Format the date (e.g., "YYYY-MM-DD")

    // Make a DELETE request to remove all past time slots
    const response = await axios.delete('https://aviran-1.onrender.com/DayBook/timeslots/removePastSlots', {
      data: { currentDate: formattedCurrentDate }
    });


  } catch (err) {
    setMessage('שגיאה בעת מחיקת התורים'); // Handle any errors and show an error message
    console.error('Error removing past time slots:', err); // Handle any errors
  }
};


//   ---------------שמירת הודעות מנהל------------
const SaveAdminMessage = async (newMessage) => {
    try {
      const resp = await axios.post('https://aviran-1.onrender.com/DayBook/Message/', { message: newMessage });
      setAdminMessage(newMessage);
      setMessage('ההודעה נשמרה בהצלחה')
    } catch (err) {
      console.error('Error saving admin message:', err);
      setMessage('ההודעה לא נשמרה, נסה שנית...')
    }
  };



    // -----------------------ייבוא הודעות מנהל----------------
    
     const fetchMessage = async () => {
    try {
      const response = await axios.get('https://aviran-1.onrender.com/DayBook/Message');
      if (response.data) {
        setAdminMessage(response.data.message); // Save the message in state
      }
    } catch (err) {
      console.error('Error fetching message:', err);
    }
  };

// -----------------ייבוא שעות פנויות לפי תאריך-----------
const handleTimeSlots = async (Day) => {
    try {
      const resp = await axios.get(`https://aviran-1.onrender.com/DayBook/timeslots/${Day}`);
      
      if (resp.data.timeSlots.length === 0) {
        setTimeRange([]); 
      } else {
        setTimeRange(resp.data.timeSlots);
      }
    } catch (err) {
      setMessage('משהו לא עובד כשורה, נסה שוב...');
    }
  };
  
  
  
   // ------------שמירת התאריך והשעות בשרת----------
const SaveDateAndHoures = async () => {
  if (selectedDate) {
    let formatedDate = formatDateForDisplay(selectedDate);

    try {
      const resp = await axios.post('https://aviran-1.onrender.com/DayBook/timeslots/', {
        date: formatedDate,
        timeSlots: timeRange.map(slot => ({
          time: slot.time, 
          isOpen: slot.isOpen, // This will save isOpen as either true or false
          bookedBy: slot.bookedBy || null, 
        }))
      });
      removePastTimeSlots();
      setMessage('התורים נשמרו בהצלחה');
    } catch (err) {
      console.error('Error saving date and hours:', err);
    }
  } else {
    setMessage('בחר קודם תאריך לפני שמירת התורים');
  }
};
    
  
  // -------------בחירת תאריך------------
  const handleSelectedDate = (date) => {
    let formattedDate = formatDateForDisplay(date);
    handleTimeSlots(formattedDate);
    setSelectedDate(date);
    setFormattedDay(getDayNameInHebrew(date));
    setFormattedDate(formatDateForTitle(date));
    
  };
  
  
  // -----------------מגדיר טווח זמנים--------------------
  const generateTimeRange = () => {
    if (!selectedDate || !startTime || !endTime) {
      setMessage('אנא בחר תאריך, שעת התחלה ושעת סיום.');
      return;
    }
  
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    if (start >= end) {
      setMessage('שעת הסיום חייבת להיות אחרי שעת ההתחלה.');
      return;
    }
  
    const range = [];
    let currentTime = start;
  
    while (currentTime <= end) {
      const formattedTime = currentTime.toTimeString().substring(0, 5);
      range.push({ time: formattedTime, isOpen: true, bookedBy: null });
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
  
    setTimeRange(range);
  };
  
  
  // ------------מחיקת זמנים---------
  
    const removeTimeSlot = (timeToRemove) => {
      setTimeRange(timeRange.filter(slot => slot.time !== timeToRemove));
    };

const values = {
  isAuthenticated,
  setIsAuthenticated,
  HandleLogin,
   setPutMessage,
   PutMessage,
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
   message,
   setMessage,
   SaveDateAndHoures,
   AdminMessage,
   SaveAdminMessage,
   setAdminMessage,
   fetchMessage,

}

    return (
        <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    );
};