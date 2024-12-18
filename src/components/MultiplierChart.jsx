import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MultiplierChart = ({ contributions }) => {
  if (!contributions) return null;

  const chartData = {
    labels: ['Gender', 'Education', 'Age'],
    datasets: [
      {
        data: [
          Math.abs(contributions.gender),
          Math.abs(contributions.education),
          Math.abs(contributions.age),
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-teal-700 text-center mb-4">Contribution Breakdown</h3>
      <div className="flex justify-center">
        <div style={{ width: '300px', height: '300px' }}>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default MultiplierChart;
