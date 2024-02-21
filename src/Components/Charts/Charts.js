import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./Charts.css";
import { Chart, LinearScale } from "chart.js/auto";

const WeeklyAverageGraph = () => {
  useEffect(() => {
    Chart.register(LinearScale);
  }, []);

  // Given data: readings for 7 days
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

  // Calculate the average reading for each day
  // const averages = readings.map(dayReadings => {
  //   const sum = dayReadings.reduce((acc, curr) => acc + curr, 0);
  //   return sum / dayReadings.length;
  // });

  // Calculate the average reading for each day without using reduce
  const averages = [];
  for (let i = 0; i < readings.length; i++) {
    let sum = 0;
    for (let j = 0; j < readings[i].length; j++) {
      sum += readings[i][j];
    }
    averages.push(sum / readings[i].length);
  }

   // Calculate the minimum and maximum values in the readings
   let minReading = Infinity;
   let maxReading = -Infinity;
   readings.forEach(dayReadings => {
     dayReadings.forEach(reading => {
       minReading = Math.min(minReading, reading);
       maxReading = Math.max(maxReading, reading);
     });
   });

  // Data for the chart
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8","Day 9", "Day 10"],
    datasets: [
      {
        label: "X Bar",
        data: averages,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

   // Options for the chart
   const options = {
    scales: {
      y: {
        min: Math.floor(minReading / 10) * 10, // Round down to nearest 10
        max: Math.ceil(maxReading / 10) * 10, // Round up to nearest 10
      },
    },
  };


  return (
    <div className="weekly-average-graph">
      <h2>Weekly Average Graph</h2>
      <div style={{ width: "500px", height: "300px" }}>
        <Line data={data} options={options}/>
      </div>
    </div>
  );
};

export default WeeklyAverageGraph;