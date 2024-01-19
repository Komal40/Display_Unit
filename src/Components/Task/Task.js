import React, { useEffect, useState } from "react";
import "./Task.css";
import Navbar from "../Navbar/Navbar";
import DashboardR from "../DashboardR/DashboardR";
import DashBoardAbove from "../DashboardR/DashBoardAbove";
import { FaPlus } from "react-icons/fa6";
import { RiEqualFill } from "react-icons/ri";
import { useUser } from "../../UserContext";
import { useSearchParams } from "react-router-dom";

export default function Task() {
  const [arr, setArr] = useState([]);
  const [lineId, setLineId] = useState("");
  const [partId, setPartId] = useState("");
  const [partName, setPartName] = useState("");
  const [qty, setQty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/get/assigend_parts";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        // params.append("floor_id", "1");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("TaskData", data.payload);
          setArr(data.payload);
          //   setLineId()
        } else {
          const errorData = await response.json();
          console.error("API Error task component:", errorData);
        }
      } catch (error) {
        console.error("Error galt id on Task :", error);
      }
    };

    fetchData();

    // Dependency array is empty to run the effect only once
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const link = process.env.REACT_APP_BASE_URL;
    console.log("Base URL:", link);
    const endPoint = "/task_assigned";
    const fullLink = link + endPoint;

    try {
      const TaskData = [{
        floor_id: "1",
        line_id: lineId,
        part_id: partId,
        part_name: partName,
        prev_quantity: "0",
        quantity: qty,
      }];

      const response = await fetch(fullLink, {
        method: "POST",
        body: JSON.stringify(TaskData),
        headers: {
          "Content-type": "application/json", // Set the Content-type header for JSON request
          Accept: "application/json", // Set the Accept header for JSON response
        },
      });

        console.log("Task add ", JSON.stringify(TaskData));

      if (response.ok) {
        const responseData = await response.json();
        console.log("task api", responseData);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleLineChange = (event) => {
    const selectedLineId = event.target.value;
    setLineId(selectedLineId);

    // Use the selected line_id to find the corresponding part_name
    const selectedLine = arr.find((line) => line.line_id === selectedLineId);
    if (selectedLine) {
      setPartName(selectedLine.part_name);
      setPartId(selectedLine.part_id);
    } else {
      setPartName("");
    }
  };

  const handleQty = (e) => {
    const val = e.target.value;
    setQty(val);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <DashBoardAbove />
      </div>

      <div className="task_container">
        <div className="task__above">
          <div className="task_aboveLine">
            <p>Add Task</p>
            <div className="dashboard_content_leftline"></div>
          </div>
          <div className="task_abovedrodown">
            <select>
              <option>Select Date</option>
            </select>
          </div>
        </div>

        <div className="task_line_select">
          <div className="task_abovedrodown">
            <select value={lineId} onChange={handleLineChange}>
              <option value="">Select Line</option>
              {arr.map((line) => (
                <option key={line.line_id} value={line.line_id}>
                  {line.line_id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="task_partrunning">
          <p>Part Running: {partName}</p>
          <div className="dashboard_content_leftline"></div>
        </div>

        <div className="task_Add_input">
          <input
            className="task_inp"
            placeholder="Add Quantity"
            value={qty}
            onChange={handleQty}
          />
        </div>

        <div>
          <div className="task_qty_container">
            {/* <div>
    <p>Previous Quantity: <span className='task_num'>350</span></p>
    <div className="dashboard_content_leftline"></div>
    </div> */}
            {/* <div className='task_symbol'>
   <FaPlus className='task_num'/>
   </div> */}
            <div>
              <p>
                Current Quantity:<span className="task_num">{qty}</span>
              </p>
              <div className="dashboard_content_leftline"></div>
            </div>
            <div className="task_symbol">
              <RiEqualFill className="task_num" />
            </div>
            <div>
              <h3>Total:{qty}</h3>
              <div className="dashboard_content_leftline"></div>
            </div>

            <div className="task_add_button">
              <button onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
