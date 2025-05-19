import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewDoctors.css'; 
import config from '../config';

export default function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    fullname: '',
    email: '',
    specialization: '',
    password: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${config.url}/getdoctors`);
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const handleChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/adddoctor`, newDoctor);
      setNewDoctor({ fullname: '', email: '', specialization: '', password: '' });
      fetchDoctors(); // refresh list
    } catch (err) {
      console.error('Error adding doctor:', err);
    }
  };

  return (
    <div className="view-doctors-container">
      <h2>Doctors</h2>
      <div className="doctor-list-container">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <h3>{doc.fullname}</h3>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Email:</strong> {doc.email}</p>
          </div>
        ))}
      </div>

      <h3>Add New Doctor</h3>
      <form onSubmit={handleAddDoctor} className="doctor-form">
        <input
          name="fullname"
          placeholder="Full Name"
          value={newDoctor.fullname}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={handleChange}
          required
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={newDoctor.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
}
