import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './DassQuiz.css'; // Import the CSS file
import config from '../config';

const DassQuiz = () => {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem('patient'));

    if (patient) {
      setPatientData(patient);
    } else {
      setError('No patient data found.');
    }
  }, []);

  const patientName = patientData ? patientData.fullname : "Anonymous"; // Access fullname here

  const [answers, setAnswers] = useState({
    d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0,
    a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, a6: 0, a7: 0,
    s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0
  });

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: parseInt(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      name: patientName,
      answers: answers
    };

    try {
      // Send the data to the Flask backend using Axios
      const response = await axios.post(`${config.url}/submit_dass_report`, data);

      if (response.status === 200) {
        // Success response
        alert('Your DASS-21 answers have been submitted!');
      } else {
        // Error response
        alert(`Error: ${response.data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the report.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">DASS-21 Quiz</h2>
      <p>Name: {patientName}</p>
      <form onSubmit={handleSubmit}>
        
        {/* Depression Scale */}
        <div className="inputContainer">
          <h3>Depression Scale (D)</h3>
          <div className="row">
            {['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'].map((item, index) => (
              <div key={index} className="inputColumn">
                <label className="label">{`Q${index + 1}. ${index < 4 ? "I found it hard to wind down" : "I found it difficult to work up the initiative"}`}</label>
                <input
                  type="number"
                  name={item}
                  value={answers[item]}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Anxiety Scale */}
        <div className="inputContainer">
          <h3>Anxiety Scale (A)</h3>
          <div className="row">
            {['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'].map((item, index) => (
              <div key={index} className="inputColumn">
                <label className="label">{`Q${index + 1}. ${index < 4 ? "I was worried about situations in which I might panic" : "I was worried about situations in which I might panic"}`}</label>
                <input
                  type="number"
                  name={item}
                  value={answers[item]}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stress Scale */}
        <div className="inputContainer">
          <h3>Stress Scale (S)</h3>
          <div className="row">
            {['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map((item, index) => (
              <div key={index} className="inputColumn">
                <label className="label">{`Q${index + 1}. ${index < 4 ? "I found it hard to wind down" : "I found myself getting agitated"}`}</label>
                <input
                  type="number"
                  name={item}
                  value={answers[item]}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default DassQuiz;
