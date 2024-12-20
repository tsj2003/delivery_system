import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PredictionResult({ predictedTime, actualTimes }) {
  const chartData = {
    labels: actualTimes.map((_, index) => `Delivery ${index + 1}`),
    datasets: [
      {
        label: 'Actual Times',
        data: actualTimes,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Predicted Delivery Time: {Math.round(predictedTime)} minutes
        </h3>
        <div className="h-64">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Delivery Times History'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}