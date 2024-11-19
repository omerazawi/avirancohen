import React from 'react';
import '../Styles/Menu.css';
import { useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className='menu'>
      <button 
        className={`menu-item ${(currentPath === '/DayBook' || currentPath === '/DayBook/' || currentPath === '/DayBook/Form' || currentPath === '/DayBook/Confirmation') ? 'active' : ''}`}
      >
        תאריך ושעה
      </button>
      <button 
        className={`menu-item ${(currentPath === '/DayBook/Form' || currentPath === '/DayBook/Confirmation') ? 'active' : ''}`}
      >
        פרטים אישיים
      </button>
      <button 
        className={`menu-item ${currentPath === '/DayBook/Confirmation' ? 'active' : ''}`} 
      >
        אישור וסיום
      </button>
    </div>
  );
}
