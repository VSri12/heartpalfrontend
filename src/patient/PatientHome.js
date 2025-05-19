import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientHome() {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch patient data from localStorage or your backend
  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem('patient'));

    if (patient) {
      setPatientData(patient);
    } else {
      setError('No patient data found.');
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.removeItem('patient');
    navigate('/login');
  };

  return (
    <div className="patient-home-container">
      <h3 className="heading">Welcome, {patientData ? patientData.fullname : 'Patient'}!</h3>
      
      {error && <h4 className="error">{error}</h4>}

      {patientData ? (
        <div className="patient-details">
          <p><strong>Full Name:</strong> {patientData.fullname}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Current Diseases:</strong> {patientData.current_diseases || 'None'}</p>
          <p><strong>Past Diseases:</strong> {patientData.past_diseases || 'None'}</p>
          <p><strong>DASS Score:</strong> {patientData.dass_score}</p>
        </div>
      ) : (
        <p>Loading patient data...</p>
      )}

    </div>
  );
}
