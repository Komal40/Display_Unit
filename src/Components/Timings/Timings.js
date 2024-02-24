import React, { useState } from "react";

const DateRangeFilter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    { date: "2024-02-01", value: 10 },
    { date: "2024-02-02", value: 15 },
    { date: "2024-02-03", value: 20 },
    { date: "2024-02-04", value: 25 },
    { date: "2024-02-05", value: 30 },
    // Add more data entries as needed
  ];

  const filterDataByDateRange = () => {
    const filtered = data.filter(entry => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return entryDate >= start && entryDate <= end;
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <button onClick={filterDataByDateRange}>Filter Data</button>
      <div>
        <h3>Filtered Data:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DateRangeFilter;