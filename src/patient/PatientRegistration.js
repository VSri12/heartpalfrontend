import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import config from '../config';

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    age: '',
    currentDiseases: '',
    pastDiseases: '',
    dassScore: 0, 
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      setMessage('');
      return;
    }

    if (formData.fullname.trim().length === 0) {
      setError('Please enter your full name.');
      setMessage('');
      return;
    }

    if (!formData.age || isNaN(formData.age) || formData.age < 1) {
      setError('Please enter a valid age.');
      setMessage('');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters and include a special character.');
      setMessage('');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/registerpatient`, {
        ...formData // don't send to backend
      });

      if (response.status === 200) {
        setMessage('Registration Successful!');
        setError('');
        setFormData({
          fullname: '',
          gender: '',
          age: '',
          currentDiseases: '',
          pastDiseases: '',
          dassScore: 0,
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.'); // Ensure the error is a string
      setMessage('');
    }
  };


  return (
    <div className="registration-container">
      <h3 className="heading">Patient Registration</h3>
      {message ? (
        <h4 align="center" className="success-message">{message}</h4>
      ) : (
        <h4 align="center" className="error-message">{error}</h4>
      )}

      <form onSubmit={handleSubmit} className="registration-form">
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} required />
        </div>

        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Age</label>
          <input type="number" id="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div>
          <label>Current Diseases</label>
          <input type="text" id="currentDiseases" value={formData.currentDiseases} onChange={handleChange} required />
        </div>

        <div>
          <label>Past Diseases</label>
          <input type="text" id="pastDiseases" value={formData.pastDiseases} onChange={handleChange} required />
        </div>

        {/* Hidden field for dassScore */}
        <input type="hidden" id="dassScore" value={formData.dassScore} readOnly />

        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
          <div className="password-rules">
            Must be 8+ characters and include at least 1 special character.
          </div>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
