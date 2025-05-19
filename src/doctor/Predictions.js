import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Predictions = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchCSVDataAndAnalyze = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.url}/palpitation_analysis_csv`);
      setData(res.data);
      setError('');
    } catch (err) {
      console.error('Error analyzing CSV data:', err);
      setError('Failed to analyze CSV heart rate data.');
      if (retryCount < 3) {
        setTimeout(() => setRetryCount(retryCount + 1), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCSVDataAndAnalyze();
  }, [retryCount]);

  if (loading) return <p className="text-blue-500">Loading data... Please wait.</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const {
    latest_prediction,
    all_predictions,
    trend_graph,
    heart_rate_trend,
    timestamp_trend,
    accuracy,
    classification_report,
    confusion_matrix
  } = data;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Heart Rate Prediction (CSV)</h1>

      <p className="text-lg mb-2">Latest Prediction: <strong>{latest_prediction}</strong></p>
      <p className="text-md mb-4">Model Accuracy: <strong>{(accuracy * 100).toFixed(2)}%</strong></p>

{heart_rate_trend && timestamp_trend && (
  <div className="my-6 mx-auto w-[320px] text-center">
    <h2 className="text-lg font-semibold mb-2">Heart Rate Trend</h2>
    <Line
      data={{
        labels: timestamp_trend,
        datasets: [{
          label: 'Heart Rate',
          data: heart_rate_trend,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
          tension: 0.3,
        }]
      }}
      options={{
        responsive: false,
        maintainAspectRatio: false,
      }}
      width={300}
      height={200}
    />
  </div>
)}



      <div className="my-6">
        <h2 className="text-lg font-semibold mb-2">Confusion Matrix</h2>
        <table className="table-auto border border-gray-400">
          <tbody>
            {confusion_matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((val, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-6">
        <h2 className="text-lg font-semibold mb-2">Classification Report</h2>
        <table className="table-auto border border-gray-400">
          <thead>
            <tr>
              <th className="border px-4 py-2">Label</th>
              <th className="border px-4 py-2">Precision</th>
              <th className="border px-4 py-2">Recall</th>
              <th className="border px-4 py-2">F1-score</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(classification_report)
              .filter(([label]) => !['accuracy', 'macro avg', 'weighted avg'].includes(label))
              .map(([label, scores]) => (
                <tr key={label}>
                  <td className="border px-4 py-2">{label}</td>
                  <td className="border px-4 py-2">{(scores.precision * 100).toFixed(2)}%</td>
                  <td className="border px-4 py-2">{(scores.recall * 100).toFixed(2)}%</td>
                  <td className="border px-4 py-2">{(scores['f1-score'] * 100).toFixed(2)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Predictions;
