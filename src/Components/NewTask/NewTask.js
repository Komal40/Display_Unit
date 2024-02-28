import React, { useEffect, useRef, useState } from "react";
import "./NewTask.css";
import Navbar from "../Navbar/Navbar";
import DashBoardAbove from "../DashboardR/DashBoardAbove";
import { FaCheck } from "react-icons/fa";
import { useUser } from "../../UserContext";

export default function NewTask() {
  const [shiftData, setShiftData] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [taskdata, settaskdata] = useState([]);
  const [partId, setPartId] = useState([]);
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [alreadyRunningLines, setAlreadyRunningLines] = useState([]);
  // const taskdata=JSON.parse(localStorage.getItem("TaskData"))

  // const {lines}=useUser()
  const line = localStorage.getItem("lines");
  // Create an array with numbers from 1 to lines
  // Define initial approval statuses for each line
  const initialApprovalStatuses = Array.from({ length: line }, () => "");

  // State for approval statuses
  const [approvalStatuses, setApprovalStatuses] = useState(
    initialApprovalStatuses
  );
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

  // GET TASK DATA

  // Function to fetch task data from the server
  const fetchTaskData = async () => {
    const link = process.env.REACT_APP_BASE_URL;
    const endPoint = "/get/task/version_two";
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
        const taskData = await response.json();
        console.log("Task Data approved", taskData);
        settaskdata(taskData.payload);
      } else {
        const errorData = await response.json();
        console.error("API Error task component:", errorData);
      }
    } catch (error) {
      console.error("Error occurred on Task:", error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [line]);

  const handleRefresh = () => {
    fetchTaskData();
  };

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
    const endPoint = "/task_assigned_version_three/version_two";
    const fullLink = link + endPoint;

    try {
      let TaskData = [];
      let taskResponse = {};

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
          console.log("alreadyRunningLines", alreadyRunningLines);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (event) => {
    setSelectedShift(event.target.value);
  };

  // APPROVED FUNCTION
  const handle_approved = async (taskId, approvalStatus, index) => {
    const link = process.env.REACT_APP_BASE_URL;
    const endPoint = "/task/approved";
    const fullLink = link + endPoint;

    try {
      const params = new URLSearchParams();
      params.append("task_id", taskId);
      params.append("value", approvalStatus);

      const response = await fetch(fullLink, {
        method: "POST",
        body: params,
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Approval response:", data);
        // Handle response if needed
        // Update the approval status in the local state
        const updatedStatuses = [...approvalStatuses];
        updatedStatuses[index] = approvalStatus; // Assuming `index` is defined
        // updatedStatuses[index] = "";
        setApprovalStatuses(updatedStatuses); // Update the state with the new values
        // Save the updated approval statuses to localStorage
        // localStorage.setItem(
        //   "approvalStatuses",
        //   JSON.stringify(updatedStatuses)
        // );
      } else {
        const errorData = await response.json();
        console.error("API Error during approval:", errorData);
      }
    } catch (error) {
      console.error("Error during approval:", error);
    }
  };

  // Retrieve approval statuses from localStorage when component mounts
  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem("approvalStatuses"));
    if (storedStatuses) {
      setApprovalStatuses(storedStatuses);
    }
  }, [line]);

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
            <select value={selectedShift} onChange={handleSelectChange}>
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
          <div ref={popupRef} className="popup" onClick={handlePopupClick}>
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
                {/* <th>Completed</th> */}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: line }, (_, index) => index + 1).map(
                (lineNumber, index) => {
                  // Specify `index` parameter here
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
                      {/* <td>4/10</td> */}
                      <td></td>
                      <td>
                        {alreadyRunningLines.includes(lineNumber.toString()) ? (
                          <p>Task is already running</p>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <div className="task_add_button">
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <hr style={{ marginTop: "2rem" }} />

      {/* GET TASK API UI  */}
      <div className="running_task">
        <div className="newtaskheading">
          <h3>Running Tasks</h3>

          <button className="approve-dropdown" onClick={handleRefresh}>
            Refresh
          </button>
        </div>

        <div className="table_content">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Line</th>
                <th>Part Id</th>
                <th>Previous</th>
                <th>Passed</th>
                <th>Failed</th>
                <th>Current</th>
                <th>Completed</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {taskdata.map((task, index) => (
                <tr key={index}>
                  <td>{task.line_id}</td>
                  <td>{task.part_id || "-"}</td>
                  <td>{task.prev_quantity || 0}</td>
                  <td>{task.parts_passed || 0}</td>
                  <td>{task.parts_failed || 0}</td>
                  <td>{task.quantity || 0}</td>
                  <td>{task.parts_completed || 0}</td>
                  <td>
                    {task.prev_quantity
                      ? parseInt(task.prev_quantity) + parseInt(task.quantity)
                      : parseInt(task.quantity)}
                  </td>
                  <td>
                    {task.approved === "0" && ( // Render dropdown only if approved is 0
                      <select
                        className="approve-dropdown"
                        value={approvalStatuses[index] || ""}
                        onChange={(e) =>
                          handle_approved(task.task_id, e.target.value, index)
                        }
                      >
                        <option>Select</option>
                        <option value="1">Approve</option>
                        <option value="2">Not Approve</option>
                      </select>
                    )}
                    {task.approved === "1" && <span>Approved</span>}
                    {task.approved === "2" && <span>Not Approved</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
