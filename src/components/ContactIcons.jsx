import React from 'react'
import '../Styles/ContactIcons.css';
import Waze from '../Data/images/waze.jpg';
import tiktok from '../Data/images/tiktok.png';
import insta from '../Data/images/insta.png';
import whatsup from '../Data/images/whatsup.png';

export default function ContactIcons() {
    const phoneNumber = '0526856068'; 
    const message = 'היי אבירן אפשר לקבוע תור?'; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
  return (
    <div className="contact-icons">
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={whatsup} className="icon" alt="WhatsApp" />
    </a>
    <img src={Waze} className="icon" alt="Waze" />
    <img src={insta} className="icon" alt="Instagram" />
   <a href='https://www.tiktok.com/@aviran_barber?_t=8rWQ2qQU2Hx&_r=1'><img src={tiktok} className="icon" alt="TikTok" /></a>
  </div>
  )
}
