import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../main/login.css';
import config from '../config';

export default function PatientLogin({ onPatientLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/checkpatientlogin`, formData);
      if (response.data != null) {
        // Call the onPatientLogin function passed down as a prop
        onPatientLogin(); 

        localStorage.setItem('patient', JSON.stringify(response.data));
        navigate("/patienthome");
      } else {
        setMessage("");
        setError("Login Failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("");
      setError(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="container">
      <h3 className="heading"><u>Patient Login</u></h3>
      {message && <h4 className="message">{message}</h4>}
      {error && <h4 className="error">{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputContainer">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}
