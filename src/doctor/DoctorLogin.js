import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../main/login.css';
import config from '../config';

export default function DoctorLogin({ onDoctorLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/checkdoctorlogin`, formData);
      if (response.data) {
        onDoctorLogin(); // this will invoke onDoctorLogin() in App.js
        localStorage.setItem('doctor', JSON.stringify(response.data)); // Store doctor data in localStorage
        navigate("/doctorhome"); // Redirect to the doctor home page
      } else {
        setMessage('');
        setError('Login Failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h3 className="heading"><u>Doctor Login</u></h3>
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
