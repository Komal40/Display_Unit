// import React from 'react'
// import './Charts.css'
// import Navbar from '../Navbar/Navbar'


// export default function Charts() {
//   return (
//     <>
//     <div>
//       <Navbar/>
//     </div>

//     <div className='charts_main'>
//         <h2>charts</h2>
//     </div>
//     </>
//   )
// }


import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = () => {
  // Static data for x-axis and y-axis
  const labels = ['January', 'February', 'March', 'April', 'May'];
  const data = [65, 59, 80, 81, 56];

  // Register the 'category' scale type for the x-axis
  Chart.register({
    id: 'category',
    scales: {
      x: {
        type: 'category'
      }
    }
  });

  // Constructing the chart data object
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Data',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Custom options for the chart
  const options = {
    scales: {
      x: {
        type: 'category', // Ensure x-axis scale type is 'category'
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Values'
        }
      }
    }
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
