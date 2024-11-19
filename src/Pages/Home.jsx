import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Data/images/Logo.jpg';
import '../Styles/App.css';
import Messeges from "../components/Messeges";
import ContactIcons from '../components/ContactIcons';
import { IoMdCut } from "react-icons/io";

export default function Home() {
 const navigate =useNavigate();

 const handleButton = () =>{
  navigate('/DayBook')
 }

  return (
    <div className='App'>
      <div className='app-container'>
      <img className="LogoImg" src={Logo} alt="logo" />
      <h1>Aviran Cohen</h1>
      <h2>Barber-Shop</h2>
      <ContactIcons />
      <Messeges />
      <div onClick={handleButton} className="button-container">
      <IoMdCut className='button-icon'/>
    <p className="button">לחץ לקביעת תור</p>
  
  </div>

  </div>
    </div>
  );
}
