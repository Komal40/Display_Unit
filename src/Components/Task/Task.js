import React, { useEffect, useState } from "react";
import "./Task.css";
import Navbar from "../Navbar/Navbar";
import DashboardR from "../DashboardR/DashboardR";
import DashBoardAbove from "../DashboardR/DashBoardAbove";
import { FaPlus } from "react-icons/fa6";
import { RiEqualFill } from "react-icons/ri";
import { useUser } from "../../UserContext";
import { useSearchParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Task() {
  const [arr, setArr] = useState([]);
  const [lineId, setLineId] = useState("");
  const [partId, setPartId] = useState("");
  const [partName, setPartName] = useState("");
  const [qty, setQty] = useState("");
  const [qty2, setqty2]=useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCompleted, setIsCompleted]=useState(false)

  // Add this state
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [taskArr, setTaskArr]=useState([])


  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      // const endPoint = "/get/assigend_parts";
      const endPoint='/get/assigned_parts_all'
      const fullLink = link + endPoint;

      try {
        const formattedDate =
          selectedDate &&
          `${selectedDate.getFullYear()}-${(
            "0" +
            (selectedDate.getMonth() + 1)
          ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;

        const params = new URLSearchParams();
        params.append("assigned_for_date", formattedDate);

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
  }, []);


  const addTask = async (e) => {

    // if (!setIsCompleted) return;

    e.preventDefault();
    const link = process.env.REACT_APP_BASE_URL;
    console.log("Base URL:", link);
    const endPoint = "/task_assigned_version_three";
    const fullLink = link + endPoint;

    try {
      // Format the selected date to "YYYY-MM-DD"
      const formattedDate =
        selectedDate &&
        `${selectedDate.getFullYear()}-${(
          "0" +
          (selectedDate.getMonth() + 1)
        ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;

        let TaskData = [];
        if (qty && document.querySelector('.task_checkbox').checked) {
          TaskData.push({
            floor_id: "1",
            line_id: "1", // Assuming the line ID for qty is 1
            part_id: arr[0]?.part_id || "", // Assuming first part for line 1
          part_name: arr[0]?.part_name || "", // Assuming first part for line 1
            prev_quantity: "0",
            quantity: qty,
          });
        }
        if (qty2 && document.querySelectorAll('.task_checkbox')[1].checked) {
          TaskData.push({
            floor_id: "1",
            line_id: "2", // Assuming the line ID for qty2 is 2
            part_id: arr[1]?.part_id || "", // Assuming first part for line 1
            part_name: arr[1]?.part_name || "", // Assuming first part for line 1
            prev_quantity: "0",
            quantity: qty2,
          });
        }


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
        setShowPopup(true);
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

  const handleQty2=(e)=>{
    const val=e.target.value;
    setqty2(val)
  }
  
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
          <div className="task_aboveLine">
            <p>Previous Task</p>
            <div className="dashboard_content_leftline"></div>
          </div>

          {/* <div className="task_abovedrodown">
            <select>
              <option>Select Date</option>
            </select>
          </div> */}

          <div className="task_abovedrodown">
            <ReactDatePicker
              className="task_datepicker"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedDay(date.getDate());
                setSelectedMonth(date.getMonth() + 1); // Adding 1 since months are zero-based
                setSelectedYear(date.getFullYear());

                // Format the selected date to "YYYY-MM-DD"
                const formattedDate =
                  date &&
                  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
                    -2
                  )}-${("0" + date.getDate()).slice(-2)}`;

                // Log the formatted date
                console.log("Selected Date (Formatted):", formattedDate);
              }}
              placeholderText="Select Date"
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>

        {/* <div className="task_line_select">
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
        </div> */}

        {/* <div className="task_partrunning">
          <p>Part Running: {partName}</p>
          <div className="dashboard_content_leftline"></div>
        </div> */}


       <div className="task__container">
       <h4>Line 1</h4>
       <div className="task_Add_input">
         
          <input
            className="task_inp"
            placeholder="Add Quantity"
            value={qty}
            onChange={handleQty}
          />
        </div>
        <input type="checkbox" className="task_checkbox"/>
       </div>


        {showPopup && (
          <div className="popup">
            <p>Task added successfully!</p>
            {/* You can customize the popup content as needed */}
          </div>
        )}

        <div>
          <div className="task_qty_container">


            {/* <div>
    <p>Previous Quantity: <span className='task_num'>350</span></p>
    <div className="dashboard_content_leftline"></div>
    </div> */}
            {/* <div className='task_symbol'>
   <FaPlus className='task_num'/>
   </div> */}
   
            {/* <div>
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
            </div> */}

            <div className="task_add_button">
              <button onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>


        {/* <div className="task_data">
          {arr
            .filter((item) => item.part_id !== undefined) // Filter out items where part_id is undefined
            .sort((a, b) => {
              const idA = parseInt(a.part_id.split("S")[1]);
              const idB = parseInt(b.part_id.split("S")[1]);
              return idA - idB;
            })
            .map((item) => (
              <div className="update__components" key={item.part_id}>
                <div>
                  <p className="operator_content">
                    Part id:&nbsp;&nbsp; <h4>{item.part_id}</h4>
                  </p>
                  <p className="operator_content">
                    Part Name:&nbsp;&nbsp; <h4>{item.part_name}</h4>
                  </p>
                </div>
              </div>
            ))}
        </div> */}


      </div>
    </>
  );
}



