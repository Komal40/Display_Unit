import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale } from "chart.js/auto"; // Assuming LineAnnotation is not used
import Navbar from "../Navbar/Navbar";
import './Charts.css';
import DashBoardAbove from "../DashboardR/DashBoardAbove";
import Chart2 from "./Chart2";

const WeeklyAverageGraph = () => {
  const [readings, setReadings] = useState([]);
  const [averageReadings, setAverageReadings] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    Chart.register(LinearScale);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/get/readings_by_date_month/version_two";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("month", "02");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.readings_data, "data reading")
          setReadings(data.readings_data);
          // Extracting dates from the readings
          const dates = Object.keys(data.readings_data);
          setDates(dates);
        } else {
          throw new Error("API Error");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate average readings for each date
    const averages = dates.map(date => {
      const average = readings[date].reduce((acc, val) => acc + parseInt(val), 0) / readings[date].length;
      return average;
    });
    setAverageReadings(averages);
  }, [dates, readings]);
  const UCL = 370; 
  const LCL = 358; 

  const data = {
    labels: dates, // Using dates as labels
    datasets: [
      {
        label: "Average Reading",
        data: averageReadings,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "UCL",
        data: Array(averageReadings.length).fill(UCL),
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
      {
        label: "LCL",
        data: Array(averageReadings.length).fill(LCL),
        fill: false,
        borderColor: "grey",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin:350, // Adjust according to your data
        suggestedMax: 450, // Adjust according to your data
        stepSize: 2, // Adjust according to your data
      },
    },
    plugins: {
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y',
            value: 370, // UCL value
            borderColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 2,
            label: {
              enabled: true,
              content: 'UCL'
            }
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y',
            value: 358, // LCL value
            borderColor: 'rgba(54, 162, 235, 0.7)',
            borderWidth: 2,
            label: {
              enabled: true,
              content: 'LCL'
            }
          }
        ]
      }
    }
  };
 
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <DashBoardAbove />
      </div>
      <div className="weekly-average-graph">
        <h2>X-Bar Chart</h2>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
      <Chart2 readings={readings}/>
    </>
  );
};

export default WeeklyAverageGraph;
