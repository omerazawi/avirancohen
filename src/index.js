import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import { AdminProvider } from './Context/AdminContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminProvider>
    <App />
    </AdminProvider>
  </React.StrictMode>
);

reportWebVitals();
