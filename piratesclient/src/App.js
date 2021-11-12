import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LandindPage from './components/LandindPage';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import CreatePirate from './components/CreatePirate';
import ViewPirate from './components/ViewPirate';
import DeletePirate from './components/DeletePirate';

function App() {
  const results = localStorage.getItem("uid");
  const [uid, setID] = useState(
    results ? results : ""
  );

  const login = id => {
    setID(id);
    localStorage.setItem("uid", id);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            uid ? 
            <LandindPage uid={uid} />
            :
            <div className="row">
              <Login login={login} />
              <Register login={login} />
            </div>
          } />
          <Route path="/logout" element={<Logout login={login} />} />
          <Route path="/create" element={<CreatePirate />} />
          <Route path="/view/:id" element={<ViewPirate />} />
          <Route path="/delete/:id" element={<DeletePirate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
