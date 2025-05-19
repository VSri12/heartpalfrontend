import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

const DassReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${config.url}/get_all_dass_reports`);
        setReports(response.data);
      } catch (err) {
        setError('Error fetching reports');
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {reports.length > 0 ? (
        <div>
          <h2>All DASS Reports</h2>
          {reports.map((report) => (
            <div key={report.id}>
              <h3>{report.patient_name}</h3>
              <p>Depression Score: {report.depression_score}</p>
              <p>Anxiety Score: {report.anxiety_score}</p>
              <p>Stress Score: {report.stress_score}</p>
              <h4>Conclusions:</h4>
              <p>Depression: {report.conclusions.depression}</p>
              <p>Anxiety: {report.conclusions.anxiety}</p>
              <p>Stress: {report.conclusions.stress}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
};

export default DassReport;
