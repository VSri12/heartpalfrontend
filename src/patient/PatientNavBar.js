import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PatientHome from './PatientHome';
import DassQuiz from './DassQuiz'; 
import HeartRateRecords from './HeartRateRecords'; 
import '../main/style.css';

export default function PatientNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isPatientLoggedIn');
    localStorage.removeItem('patient');
    navigate('/');
    window.location.reload(); 
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/patienthome">Home</Link></li>
          <li><Link to="/dassquiz">DASS Quiz</Link></li>
          <li><Link to="/heartraterecords">My Heart Rate Records</Link></li>
          <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/patienthome" element={<PatientHome />} />
        <Route path="/dassquiz" element={<DassQuiz />} />
        <Route path="/heartraterecords" element={<HeartRateRecords />} />
      </Routes>
    </div>
  );
}
