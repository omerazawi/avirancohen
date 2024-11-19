import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ViewPassword, setViewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://aviran-1.onrender.com/DayBook/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/Admin');
    } catch (err) {
      setError('שם משתמש או סיסמה שגויים');
    }
  };

  const togglePasswordVisibility = () => {
    setViewPassword(!ViewPassword);
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
      <h1 className='login-title'>התחברות</h1>
        <label className='login-label'>שם משתמש:</label>
        <input className='login-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label className='login-label'>סיסמה:</label>
        <div className='password-lable'>
        <input className='login-input' type={ViewPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
        {ViewPassword ? <IoMdEyeOff className='show-btn' onClick={togglePasswordVisibility} /> : <IoMdEye className='show-btn' onClick={togglePasswordVisibility} />}
        </div>
      {error && <p className='login-error'>{error}</p>}
        <button className='login-btn' type="submit">התחבר</button>
      </form>
    </div>
  );
}
