import React, { useContext, useEffect} from 'react';
import { AdminContext } from './Context/AdminContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { ClientProvider } from './Context/ClientContext';
import Admin from './Pages/Admin';
import DayBook from './Pages/DayBook';
import Alert from './components/Alert';
function App() {
const {isAuthenticated,setIsAuthenticated,HandleLogin,message} = useContext(AdminContext)
  useEffect(() =>{
HandleLogin();
  },[isAuthenticated])
return (
    
      <Router>
        <ClientProvider>
        {message && <Alert message={message} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/DayBook/*" element={<DayBook />} />
            <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/Admin" element={isAuthenticated ? <Admin /> : <Navigate to="/Login" />} />
          </Routes>
        </ClientProvider>
      </Router>

  );
}

export default App;
