import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import PatientNavBar from './patient/PatientNavBar';
import AdminNavBar from './admin/AdminNavBar';
import MainNavBar from './main/MainNavBar';
import DoctorNavBar from './doctor/DoctorNavBar';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({
    admin: false,
    patient: false,
    doctor: false
  });

  useEffect(() => {
    // Check local storage for each role
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const patientLoggedIn = localStorage.getItem('isPatientLoggedIn') === 'true';
    const doctorLoggedIn = localStorage.getItem('isDoctorLoggedIn') === 'true';

    setUserLoggedIn({
      admin: adminLoggedIn,
      patient: patientLoggedIn,
      doctor: doctorLoggedIn
    });
  }, []);

  const handleLogin = (role) => {
    // Update local storage and state based on role
    localStorage.setItem(`is${role}LoggedIn`, 'true');
    setUserLoggedIn((prevState) => ({
      ...prevState,
      [role.toLowerCase()]: true
    }));
  };

  const getNavBar = () => {
    if (userLoggedIn.admin) {
      return <AdminNavBar />;
    } else if (userLoggedIn.patient) {
      return <PatientNavBar />;
    } else if (userLoggedIn.doctor) {
      return <DoctorNavBar />;
    } else {
      return (
        <MainNavBar
          onAdminLogin={() => handleLogin('Admin')}
          onPatientLogin={() => handleLogin('Patient')}
          onDoctorLogin={() => handleLogin('Doctor')}
        />
      );
    }
  };

  return (
    <div className="App">
      <h1>AI-Based Mental Health Support</h1>
      <Router>
        {getNavBar()}
      </Router>
    </div>
  );
}

export default App;
