import React, { useEffect, useState } from "react";
import "./NewTask.css";
import Navbar from "../Navbar/Navbar";
import DashBoardAbove from "../DashboardR/DashBoardAbove";
import { FaCheck } from "react-icons/fa";
import { useUser } from "../../UserContext";

export default function NewTask() {
  const [shiftData, setShiftData] = useState([]);
  const [partId, setPartId] = useState([]);
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [alreadyRunningLines, setAlreadyRunningLines] = useState([]);


  // const {lines}=useUser()
  const line = localStorage.getItem("lines");
  // Create an array with numbers from 1 to lines
  const lineNumbers = Array.from({ length: line }, (_, index) => index + 1);

  const handleQuantity = (e, lineNumber) => {
    const { value } = e.target;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [lineNumber]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/get_shift_timings";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("TaskshiftData", data.shift_timings);
          setShiftData(data.shift_timings);
        } else {
          const errorData = await response.json();
          console.error("API Error task component:", errorData);
        }
      } catch (error) {
        console.error("Error galt id on Task :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (line <= 0) return;

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/get/assigend_parts/version_two";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("partidtData", data);
          setPartId(data.payload);
        } else {
          const errorData = await response.json();
          console.error("API Error task component:", errorData);
        }
      } catch (error) {
        console.error("Error galt id on Task :", error);
      }
    };

    fetchData();
  }, []);


  const addTask = async (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (checkboxes.length === 0) {
      console.log("No checkboxes selected.");
      return;
    }

    const link = process.env.REACT_APP_BASE_URL;
    const endPoint = "/task_assigned_version_two/version_two";
    const fullLink = link + endPoint;

    try {
      let TaskData = [];

      checkboxes.forEach((checkbox) => {
        const lineNumber = checkbox.getAttribute("data-line-number");
        const partId = checkbox.getAttribute("data-part-id");
        const partName = checkbox.getAttribute("data-part-name");
        // Dynamically capture the quantity for each checkbox based on user input
        const quantity = quantities[lineNumber] || "";

        TaskData.push({
          floor_id: "1",
          line_id: lineNumber,
          part_id: partId,
          part_name: partName,
          prev_quantity: "0",
          quantity: quantity,
        });
      });

      const response = await fetch(fullLink, {
        method: "POST",
        body: JSON.stringify(TaskData),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Task API Response:", responseData);
        if (responseData.message == "Task is already running") {
          const runningLine = TaskData.map((data) => data.line_id);
          setAlreadyRunningLines(runningLine);
          console.log("alreadyRunningLines",alreadyRunningLines)
        } else {
          setShowPopup(true);
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handlePopupClick = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <DashBoardAbove />
      </div>

      <div className="newTask_main">
        <div className="task__above">
          <div className="task_aboveLine">
            <p>Add Task</p>
            <div className="dashboard_content_leftline"></div>
          </div>
          <div className="task_aboveLine">
            <p>Previous Task</p>
            {/* <div className="dashboard_content_leftline"></div> */}
          </div>
          <div className="update_dropdown">
            <select>
              {<option value="">Select Shift</option>}
              {shiftData.map((shift, index) => (
                <option key={index} value={shift.shift_name}>
                  {shift.shift_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {showPopup && (
          <div className="popup" onClick={handlePopupClick}>
            <p>Task added successfully!</p>
          </div>
        )}
        <div className="newtaskheading">
          <h3>Tasks</h3>
        </div>

        <div className="table_content">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Line</th>
                <th>Part Id</th>
                <th>Previous</th>
                <th>Current</th>
                <th>Total</th>
                <th>Check</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: line }, (_, index) => index + 1).map(
                (lineNumber) => {
                  const part = partId.find(
                    (task) => task.line_id == lineNumber.toString()
                  );
                  const previousQty = 0; // Assuming previous quantity is always 0
                  const currentQty = parseFloat(quantities[lineNumber]) || 0; // Retrieve current quantity from state
                  const total = previousQty + currentQty;
                  return (
                    <tr key={lineNumber}>
                      <td>{lineNumber}</td>
                      <td>{part ? part.part_id : "-"}</td>
                      <td>{previousQty}</td>
                      <td>
                        <input
                          placeholder="Enter Quantity"
                          value={quantities[lineNumber] || ""}
                          onChange={(e) => handleQuantity(e, lineNumber)}
                        />
                      </td>
                      <td>{total}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="check_box"
                          data-line-number={lineNumber}
                          data-part-id={part ? part.part_id : ""}
                          data-part-name={part ? part.part_name : ""}
                        />
                      </td>
                      <td>4/90</td>
                      <td>
                        {alreadyRunningLines.includes(lineNumber.toString()) ? (
                          <p>Task is already running</p>
                        ) : (
                          <button className="Approve_btn">Approve</button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {/* <div >
    <button className="Approve_btn">
        Approved
    </button>
</div> */}
        </div>
        <div className="task_add_button">
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
    </>
  );
}
