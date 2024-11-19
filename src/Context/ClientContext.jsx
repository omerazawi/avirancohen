import React, { createContext, useState } from "react";
import { formatDateForDisplay } from '../Data/formatDate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Message, setMessage] = useState('');
  const [Slots, setSlots] = useState(null);
  const [Name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [LastName, setLastName] = useState('');
  const [SlotSelect, setSlotSelect] = useState('');

  const sendWhatsAppMessage = (phoneNumber, message) => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank'); // פותח חלון חדש עם ההודעה ב-WhatsApp
  };
  
    const handleSendMessage = () => {
      const phoneNumber = "972522649299"; // מספר הטלפון בפורמט בינלאומי בלי +
      const message = "שלום, איך אפשר לעזור לך?";
      sendWhatsAppMessage(phoneNumber, message);
    };

  // --- קריאה לשרת כדי לקבל תורים לפי תאריך ---
  const HandleTimeSlots = async (formattedDate) => {
    try {
      setIsLoading(true);
      const resp = await axios.get(`https://aviran-1.onrender.com/DayBook/timeslots/${formattedDate}`);
      
      if (resp.data.timeSlots.length === 0) {
        setMessage(resp.data.message || 'אין תורים פנויים ליום זה');
        setSlots([]);
        setTimeout(() => {
          setIsLoading(false);
        }, 900);
      } else {
        setSlots(resp.data.timeSlots); // שמירת התורים
        setMessage('');
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
      
    } catch (err) {
      setIsLoading(false);
      setMessage('משהו לא עובד כשורה, נסה שוב...');
    }
  };

  // --- ניהול בחירת תאריך ---
  const handleSelectedDate = (date) => {
    const formattedDate = formatDateForDisplay(date);
    setSelectedDate(date);
    HandleTimeSlots(formattedDate); // קריאה לשרת עם התאריך המעוצב
    console.log(formattedDate); 
  };

  // --- שמירת בחירת תור ---
  const HandleSlot = (slot) => {
    const Data = {
      slot: slot.time,
      selectedDate
    };
    setSlotSelect(Data);
    navigate('DayBook/Form', { state: Data });
  };

  // --- שיגור המידע מהטופס ---
  const handleData = (e) => {
    e.preventDefault();
    if(SlotSelect){
    const userInfo = { Name, phoneNumber, LastName, SlotSelect, selectedDate };
    setMessage('');
    navigate(`/DayBook/Confirmation`, { state: { userInfo } });
    }
    else{
      setMessage('חובה לבחור תאריך ושעה')
    }
  };

  const values = {
    selectedDate,
    handleSelectedDate,
    Message,
    Slots,
    HandleSlot,
    setName,
    setLastName,
    setPhoneNumber,
    handleData,
    Name,
    LastName,
    phoneNumber,
    isLoading,
    setIsLoading,
    handleSendMessage
  };

  return (
    <ClientContext.Provider value={values}>
      {children}
    </ClientContext.Provider>
  );
};
