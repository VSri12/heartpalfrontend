import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import DoctorHome from './DoctorHome';
import ViewPatients from './ViewPatients';
import Predictions from './Predictions';
import DassScores from './DassReport';
import CurrentHeartRate from './CurrentHeartRate';


export default function DoctorNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isDoctorLoggedIn');
    localStorage.removeItem('doctor');
    navigate('/doctorlogin');
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/doctorhome">Home</Link></li>
          <li><Link to="/viewpatients">View Patients</Link></li>
          <li><Link to="/predictions">Predictions</Link></li>
          <li><Link to="/dass-scores">Display DASS Report</Link></li>
          <li><Link to="/current_hr">Current Heart Rate of the Patient</Link></li>
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/doctorhome" element={<DoctorHome />} />
        <Route path="/viewpatients" element={<ViewPatients />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/dass-scores" element={<DassScores />} />
        <Route path="/current_hr" element={<CurrentHeartRate/>}/>
      </Routes>
    </div>
  );
}
