import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale } from "chart.js/auto";
import Navbar from "../Navbar/Navbar";
import './Charts.css'
import DashBoardAbove from "../DashboardR/DashBoardAbove";

const WeeklyAverageGraph = () => {
  const [readings, setReadings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [averageReadings, setAverageReadings] = useState([]);

  useEffect(() => {
    Chart.register(LinearScale);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/get/process_data_readings_timestamps/version_two";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("process_id", "2");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReadings(data.data_by_date);
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
    if (selectedDate && readings[selectedDate]) {
      const average = readings[selectedDate].reduce((acc, val) => acc + parseInt(val), 0) / readings[selectedDate].length;
      setAverageReadings([average]);
    } else {
      setAverageReadings([]);
    }
  }, [selectedDate, readings]);

  const handleChangeDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const data = {
    labels: ["Average Reading"],
    datasets: [
      {
        label: selectedDate,
        data: averageReadings,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin: 350,
        suggestedMax: 370,
        stepSize: 5,
      },
    },
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
        <select onChange={handleChangeDate}>
          <option value="">Select Date</option>
          {Object.keys(readings).map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <div style={{ width: "500px", height: "300px" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default WeeklyAverageGraph;
