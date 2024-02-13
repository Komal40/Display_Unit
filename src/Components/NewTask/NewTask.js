import React from "react";
import "./NewTask.css";
import Navbar from "../Navbar/Navbar";
import DashBoardAbove from "../DashboardR/DashBoardAbove";
import { FaCheck } from "react-icons/fa";

export default function NewTask() {
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
              {Array.from({ length: 2 }, (_, index) => (
                <option key={index + 1} value={`Line ${index + 1}`}>{`Line ${
                  index + 1
                }`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="newtaskheading">
          <h3>Tasks</h3>
        </div>

        <div className="table_content">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Line</th>
                <th>Part</th>
                <th>Current</th>
                <th>Check</th>
                <th>Completed</th>
                <th>Check box</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>
                  <input type="checkbox" className="check_box"></input>
                </td>
                <td>
                  <button className="Approve_btn">Approved</button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div >
    <button className="Approve_btn">
        Approved
    </button>
</div> */}
        </div>
      </div>
    </>
  );
}
