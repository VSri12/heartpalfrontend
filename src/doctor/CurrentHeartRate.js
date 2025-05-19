import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function CurrentHeartRate() {
  const [heartRate, setHeartRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeartRate = async () => {
      try {
        const response = await axios.post(`${config.url}/current_heart_rate`);
        console.log('API Response:', response.data);

        if (response.data) {
          setHeartRate(response.data);
        } else {
          setError('No heart rate data found.');
        }
      } catch (err) {
        setError('Failed to fetch current heart rate');
        console.error('Error fetching heart rate:', err);
      }
    };

    fetchHeartRate();
    const intervalId = setInterval(fetchHeartRate, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : heartRate !== null ? (
        <div style={styles.heartContainer}>
          <div style={styles.heartIcon}>&#10084;</div>
          <p style={styles.heartText}>Current Heart Rate: <strong>{heartRate} BPM</strong></p>
        </div>
      ) : (
        <p style={styles.loading}>Loading...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heartContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeIn 1s ease-in-out',
  },
  heartIcon: {
    fontSize: '60px',
    color: '#e63946',
    animation: 'heartbeat 1s infinite',
  },
  heartText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#1d3557',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  loading: {
    fontStyle: 'italic',
  }
};


