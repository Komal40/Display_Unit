import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale } from "chart.js/auto";

const Chart2 = () => {
  Chart.register(LinearScale);

  // Given data: readings for 10 days
  const readings = [
    [355, 360, 362, 363, 367],
    [360, 365, 364, 367, 370],
    [360, 365, 364, 367, 370],
    [355, 365, 366, 362, 364],
    [360, 365, 364, 367, 370],
    [360, 365, 364, 367, 370],
    [360, 365, 364, 367, 370],
    [355, 365, 366, 362, 364],
    [355, 360, 362, 363, 367],
    [360, 365, 364, 367, 370],
  ];

  // Calculate the range for each day
  const ranges = readings.map(dayReadings => {
    const max = Math.max(...dayReadings);
    const min = Math.min(...dayReadings);
    return max - min;
  });

  // Define UCL, LCL, and Rbar values for R
  const UCL = 22.2; // Example value, replace with actual UCL for R
  const LCL = 0; // Example value, replace with actual LCL for R
  const Rbar = 10.5; // Example value, replace with actual Rbar for R

  // Data for the chart
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
    datasets: [
      {
        label: "R",
        data: ranges,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "UCL",
        data: Array(ranges.length).fill(UCL),
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
      {
        label: "LCL",
        data: Array(ranges.length).fill(LCL),
        fill: false,
        borderColor: "grey",
        tension: 0.1,
      },
      {
        label: "Rbar",
        data: Array(ranges.length).fill(Rbar),
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 25,
        stepSize: 5,
      },
    },
  };

  return (
    <div className="weekly-average-graph">
      <h2>R Chart</h2>
      <div style={{ width: "500px", height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart2;
