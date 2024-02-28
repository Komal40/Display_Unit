import React, { useEffect, useState } from "react";
import Line from "../Line/Line";
import Operator from "../Operator/Operator";
import DashboardR from "../DashboardR/DashboardR";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
// import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import { FaChartLine } from "react-icons/fa";
import { io as socketIOClient } from "socket.io-client";
import WebSocket from "websocket";
import "./PrevData.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PrevData() {
  const navigate = useNavigate();
  //MY VARIABLES

  const [firstEffectCompleted, setFirstEffectCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Step 1: State variable for modal visibility
  const [selectedStation, setSelectedStation] = useState(null); // State to track the selected station
  const [workModalData, setWorkModalData] = useState({});
  const [stationid, setStationid] = useState("");
  const [modal1, setModal1] = useState(false);
  const [secondEffectComplete, setSecondEffectComplete] = useState(false);

  //MY VARIABLES

  const [arr, setArr] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [line, setLine] = useState(0);

  const [stations, setStations] = useState(0);

  const { setNumberLineStations } = useUser();

  const { setNumberOfLines } = useUser();

  const { loginData } = useUser();

  const { setProcessDataFun } = useUser();

  const currentDate = new Date();

  // Get the date components
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const day = currentDate.getDate();

  const dates = ["2024-02-21", "2024-02-22", "2024-02-23"];
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  // Create an array of length equal to buttonCount
  const buttons = Array.from({ length: 16 }, (_, index) => index + 1);

  useEffect(() => {
    if (!firstEffectCompleted) return;

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/stations/getstations/version_two";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("floor_id", "1");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("StationData", data.stationdata);
          setSecondEffectComplete(true);
          setArr(data.stationdata);
          setNumberLineStations(data.stationdata);
          // console.log("length station",data.stationdata.length)
          setStations(data.stationdata.length);
          // setNumberOfLines(data.stationdata.line_num)
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };
    fetchData();

    // Dependency array is empty to run the effect only once
  }, [firstEffectCompleted]);

  useEffect(() => {
    // console.log("lines", lines)

    // console.log("codeData",codeData );

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/floor/getfloor";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("floor_id", "1");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        console.log("floor-id", "1");

        if (response.ok) {
          setFirstEffectCompleted(true);
          const data = await response.json();
          // console.log("response", response)
          const line_num = data.floordata.number_of_lines;
          // console.log(data)
          console.log("number of lines ", line_num);
          setLine(line_num);
          setNumberOfLines(line_num);
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate) return; // Skip if selectedDate is null
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/get/work_data/process_data/version_two";
      const fullLink = link + endPoint;

      // Format date and month to match the required format
      const selectedDay = selectedDate.getDate().toString().padStart(2, "0");
      const selectedMonth = (selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");

      try {
        const params = new URLSearchParams();
        params.append("station_id", stationid);
        params.append("date", selectedDay);
        params.append("month", selectedMonth);

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProcessData(data.payload4.process_data);
          setWorkData(data.payload4.work_f1_data);
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  console.log("processData", processData);

  const scrollLeft = () => {
    const container = document.querySelector(".dashboard_line_buttons");
    if (container) {
      container.scrollLeft -= 100; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    const container = document.querySelector(".dashboard_line_buttons");
    if (container) {
      container.scrollLeft += 100; // Adjust the scroll amount as needed
    }
  };

  const handleStationClick = async (stationNum, stationId) => {
    try {
      setSelectedStation(stationNum);
      setStationid(stationId);
      if (true) {
        setModalOpen(true);
        setWorkModalData(workData);
        // If data is found, hide the "No data found" modal if it's visible
        setModal1(false);
      } else {
        // If response is not okay, show the "No data found" modal
        setModal1(true);
      }
      // const errorData = await response.json();
      // throw new Error(`API Error: ${JSON.stringify(errorData)}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("workModalData", workModalData);
  function handlechartClick() {
    navigate("/chart");
  }

  return (
    <div>
      {/* <div className={`${isNavbarClose ? 'dashboard_container':'shifted'}`}> */}
      {/* <div style={dashboardStyle}> */}

      <DashboardR />
      <div className="arrow_btn">
        {/* <div className="dashboard_arrows">
          <button className="arrow-button left" onClick={scrollLeft}>
            &#60;
          </button>
          <button className="arrow-button right" onClick={scrollRight}>
            &#62;
          </button>
        </div> */}
        <div className="dashboard_line_buttons">
          {Array.from({ length: line }).map((_, index) => (
            <button
              key={index}
              className={activeButton === index + 1 ? "active" : ""}
              onClick={() => handleButtonClick(index + 1)}
            >
              Line {index + 1}
            </button>
          ))}
        </div>
      </div>

      {Array.from({ length: line }).map((_, index) => (
        <div
          key={index}
          style={{ display: activeButton === index + 1 ? "block" : "none" }}
        >
          {activeButton === index + 1 && (
            <Line
              no={index + 1}
              processData={processData}
              arr={arr}
              // passMin={passMin} failTotal={failTotal} totalStations={totalStations}
            />
          )}
          <div className="prevdaataa">
            {/* <select onChange={handleDateChange}>
              <option value="">Select Date</option>
                      
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select> */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
            />
          </div>

          <div className="dashboard_stations">
            {arr
              .filter((item) => item.line_num === index + 1)
              .map((item) => {
                const stationNum = item.station_num;
                const stationId = item.station_id;

                const passes = workData.filter(
                  (data) => data.status == "1" && data.station_num == stationNum
                ).length;

                const fails = workData.filter(
                  (data) => data.status == "0" && data.station_num == stationNum
                ).length;

                // const added = processData.work_f1_data.filter(
                //   (data) =>
                //     data.isfilled == "1" && data.stationNum == stationNum
                // ).length;
                // const added2 = processData.work_f1_data.filter(
                //   (data) =>
                //     data.isfilled == "0" && data.stationNum == stationNum
                // ).length;

                return (
                  <div
                    className="operator_line"
                    // Step 3: Attach event handler to open modal
                    key={stationNum}
                  >
                    <div
                      className="operator_container1"
                      onClick={() => handleStationClick(stationNum, stationId)}
                    >
                      <div>
                        <h3>Morning Shift</h3>
                        <p className="operator_content">
                          Operator&nbsp;:&nbsp; <h4>{item.e_one_name}</h4>
                        </p>
                        <p className="operator_content">
                          Operator Skill:&nbsp;&nbsp;<h4>{item.e_one_skill}</h4>
                        </p>
                        <p className="operator_content">
                          Station :&nbsp;&nbsp; <h4>{item.station_num}</h4>
                        </p>
                        <p className="operator_content">
                          Process :&nbsp;&nbsp;<h4>{item.process_name}</h4>
                        </p>
                      </div>
                      <div className="operator_below_content">
                        {passes + fails} Done&nbsp; {passes} Pass &nbsp;{fails}{" "}
                        Fail&nbsp;
                        {/* {added + added2} Added */}
                      </div>
                      {/* {item.is_chart_available == "1" ? (
                        <button
                          className="chart_icon"
                          onClick={() => handlechartClick(stationNum)}
                        >
                          Chart
                        </button>
                      ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      {/* Modal */}
      {/* {modal1 && (
        <div className="station_modal">
          <div className="station_modal-content">
            <span className="close" onClick={() => setModal1(false)}>
              &times;
            </span>
            <p>No Data Found</p>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="station_modal">
          <div className="station_modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            
            <h1 style={{ margin: "auto" }}>
              Station {selectedStation} Details
            </h1>
            
            {workModalData &&
            workModalData.work_f1_data &&
            workModalData.work_f1_data.length > 0 ? (
              <div>
                {workModalData.work_f1_data.map((work, index) => (
                  <div key={index} className="process__container">
                    <h3 className="process_heading">Work {index + 1}</h3>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <td>Status</td>
                          <td>IsFilled</td>
                          <td>Reason</td>
                          <td>Remark</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{work.status === "1" ? "Pass" : "Fail"}</td>
                          <td>{work.isfilled}</td>
                          <td>{work.status === "0" ? work.reason : "-"}</td>
                          <td>{work.status === "0" ? work.remark : "-"}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      {/* {workModalData.process_data[index] && (
                        <div className="process_div">
                          <h4>Process Setting Value</h4>
                          <td>{workModalData.process_data[index].p1}</td>
                          <h4>Process Actual Value</h4>
                          <td>{workModalData.process_data[index].p2}</td>
                        </div>
                      )} */}
                      {/* {workModalData.process_data[index] && (
                        <div className="process_div">
                          <h4>
                            <u>Process Setting Value</u>
                          </h4>
                          {workModalData.process_data[index].p1
                            .split(",")
                            .map((part, i) => (
                              <div key={i}>{part}</div>
                            ))}
                          <h4>
                            <u>Process Actual Value</u>
                          </h4>
                          {workModalData.process_data[index].p2
                            .split(",")
                            .map((part, i) => (
                              <div key={i}>{part}</div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div> */}
            {/* ) : (
              <p>No data found for Station {selectedStation}</p>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}
