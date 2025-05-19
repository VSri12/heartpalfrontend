import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import './ViewPatients.css'; // Add styling for the cards

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch patients data from the backend
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${config.url}/getpatients`);
        setPatients(res.data); // Store patients data in state
        setLoading(false);
      } catch (err) {
        setError('Error fetching patients data');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-patients">
      <h2>Patients List</h2>
      <div className="patients-grid">
        {patients.map((patient) => (
          <div className="patient-card" key={patient.id}>
            <h3>{patient.fullname}</h3>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Current Diseases:</strong> {patient.current_diseases}</p>
            <p><strong>Past Diseases:</strong> {patient.past_diseases}</p>
            <p><strong>DASS Score:</strong> {patient.dass_score}</p>
            <p><strong>Email:</strong> {patient.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
