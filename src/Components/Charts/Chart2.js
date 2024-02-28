import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale } from "chart.js/auto";
import './Charts.css';

const WeeklyAverageGraph = ({ readings }) => {
  const [rangeReadings, setRangeReadings] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    Chart.register(LinearScale);
  }, []);

  useEffect(() => {
    if (readings && Object.keys(readings).length > 0) {
      const dates = Object.keys(readings);
      setDates(dates);

      // Calculate the range for each day
      const ranges = dates.map(date => {
        const dayReadings = readings[date];
        const max = Math.max(...dayReadings);
        const min = Math.min(...dayReadings);
        return max - min;
      });
      setRangeReadings(ranges);
    }
  }, [readings]);

  const UCL = 22.2;
  const LCL = 0;
  const Rbar = 10.5;

  const options = {
    scales: {
      y: {
        suggestedMin: Math.min(0, ...rangeReadings, LCL, UCL, Rbar) ,
        suggestedMax: Math.max(25, ...rangeReadings, LCL, UCL, Rbar) ,
        stepSize: 2,
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "R",
        data: rangeReadings,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "UCL",
        data: Array(dates.length).fill(UCL),
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
      {
        label: "LCL",
        data: Array(dates.length).fill(LCL),
        fill: false,
        borderColor: "grey",
        tension: 0.1,
      },
      {
        label: "Rbar",
        data: Array(dates.length).fill(Rbar),
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="weekly-average-graph">
      <h2>R-Chart</h2>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyAverageGraph;
