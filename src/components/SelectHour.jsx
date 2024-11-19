import React, { useContext } from 'react';
import { ClientContext } from '../Context/ClientContext';
import { MdAccessTime } from "react-icons/md";
export default function SelectHour() {
  const { Slots, HandleSlot,ShowDaySelect } = useContext(ClientContext);

  const openSlots = Slots.filter(slot => slot.isOpen);

  return (
    <div className='select-slot-container'>
      <h4>בחר שעה פנויה:</h4>
      {ShowDaySelect}
      <div className='slots'>
      {openSlots.length > 0 ? (
        openSlots.map((slot, index) => (
          <div className='select-slot' key={slot._id || `${slot.time}-${index}`}>
            <p onClick={() => HandleSlot(slot)}>
             <MdAccessTime /> {slot.time}
            </p>
          </div>
        ))
      ) : (
        <p>אין תורים פנויים ליום הזה</p>
      )}
      </div>
    </div>
  );
}
