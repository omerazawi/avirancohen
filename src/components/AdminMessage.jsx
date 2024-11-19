import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../Context/AdminContext';
import '../Styles/AdminMessage.css';
import { IoMdClose } from "react-icons/io";

export default function AdminMessage() {
  const {
    setPutMessage,
    AdminMessage,
    SaveAdminMessage,
    setAdminMessage,
    fetchMessage,
  } = useContext(AdminContext);

  const [tempMessage, setTempMessage] = useState(''); // Initialize with an empty string

  // Fetch the current message when the component loads
  useEffect(() => {
    if (!AdminMessage) {
      fetchMessage(); // Fetches the current admin message
    }
    setTempMessage(AdminMessage || ''); // Ensure tempMessage is never undefined
  }, [AdminMessage, fetchMessage]);

  // Handle input change (this will clear the input when the user starts typing)
  const handleInputChange = (e) => {
    setTempMessage(e.target.value);
  };

  // Save the updated message
  const handleSaveMessage = () => {
    setAdminMessage(tempMessage); // Update the context state
    SaveAdminMessage(tempMessage);
    setPutMessage(''); // Pass the tempMessage to the save function
  };

  // Close the message modal without saving, reset the message
  const handleClose = () => {
    setPutMessage(false); // Close the modal
    setTempMessage(AdminMessage || ''); // Reset to the original message or empty string
  };

  return (
    <div className='admin-message-container'>
      <div className='admin-message'>
        <IoMdClose className='close-admin-message' onClick={handleClose} />
        <label>הכנס הודעה:</label>
        <input
          className='admin-message-input'
          type='text'
          value={tempMessage} // Ensure it's always a controlled input
          onChange={handleInputChange} // Update the temporary message state
        />
        <button className='admin-message-button' onClick={handleSaveMessage}>
          שמירת הודעה
        </button>
      </div>
    </div>
  );
}
