import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './Authentication';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  // Initialize state from localStorage if available
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });
  
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });
  
  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);
  
  const handleLogin = (name, regNumber) => {
    const user = {
      name: name,
      regNumber: regNumber
    };
    setUserData(user);
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
  };
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/login" element={
            isLoggedIn ? 
              <Navigate to="/dashboard" /> : 
              <Login onLogin={handleLogin} />
          } />
          <Route path="/dashboard" element={
            isLoggedIn ? 
              <Dashboard userData={userData} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;