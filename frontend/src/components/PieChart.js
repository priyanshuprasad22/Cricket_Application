// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ wins, losses }) => {
    const data = {
      labels: ['Wins', 'Losses'],
      datasets: [
        {
          data: [wins, losses],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false, // Control the aspect ratio
    };
  
    return (
      <div style={{ position: 'relative', height: '40vh', width: '40vw' }}>
        <h3>Win-Loss Distribution</h3>
        <Pie data={data} options={options} />
      </div>
    );
  };
  
  export default PieChart;
  