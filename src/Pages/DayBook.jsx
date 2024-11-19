import React,{Suspense, lazy} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DaySelect from './DaySelect'; 
import { FaArrowRight } from "react-icons/fa";
import '../Styles/DayBook.css';
import Menu from '../components/Menu';

const Form = lazy(() => import('./Form'));
const Confirmation = lazy(() => import('./Confirmation'));

export default function DayBook() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/'); 
    }
  };


  return (
    <div className='daybook-container'>
      <div className='daybook-header'>
        <FaArrowRight onClick={handleGoBack} className='back-button' />
        <h1 className='daybook-title'>הזמנת תור</h1>
        <button onClick={() => navigate('Form')}></button> {/* Corrected path */}
      </div>
      <Menu />
      <Suspense fallback={<div>טוען...</div>}>
      <Routes>
        <Route path='/' element={<DaySelect />} />
        <Route path='Form' element={<Form />} /> {/* Removed leading slash */}
        <Route path='Confirmation' element={<Confirmation />} /> {/* Removed leading slash */}
      </Routes>
      </Suspense>
    </div>
  );
}
