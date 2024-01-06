import React, { useEffect, useState } from "react";
import "./UpFloor.css";
import { FaPlus } from "react-icons/fa6";
import AddLine from "../AddLine/AddLine";
import Navbar from "../Navbar/Navbar";
import DashboardR from "../DashboardR/DashboardR";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";



export default function UpFloor() {
  const { lines } = useUser();
  const {setLineNumber}=useUser()
  // const codeData = userData.logindata;
  const navigate = useNavigate()

  const [selectedLine, setSelectedLine] = useState(0);

  const handleLineChange = (event) => {
    const selectedLine = event.target.value;
    const lineNumber = parseInt(selectedLine.replace(/\D/g, ""), 10);
    setSelectedLine(lineNumber);
    console.log("linenum", lineNumber)
    setLineNumber(lineNumber)
    navigate('/upFloor')
    // Redirect to the route for the selected line
    // history.push(`/line/${selectedLine}`);
  };
// console.log(selectedLine)

const linePage=()=>{
  navigate('/upFloor')
}

  // useEffect(() => {
  //   console.log("capi line", lines);
  // }, [lines]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <DashboardR />
      </div>
      <div className="updatesFloor__cont">
        <div className="update_linecontainer">
          <div className="update_dropdown">
            <select value={selectedLine} onChange={handleLineChange} >
              {lines > 1 && <option value="">Select Line</option>}
              {Array.from({ length: lines }, (_, index) => (
                <option key={index + 1} value={`Line ${index + 1}`}>{`Line ${
                  index + 1
                }`}</option>
              ))}
            </select>
          </div>
          <div className="update_add_btn">
            <FaPlus className="update_plus" />
            <span>
              <button>Add New Line</button>
            </span>
          </div>

          <div className="update_error">
            <h5>Error Message: </h5>
          </div>
        </div>

        <div className="updateparts__btn">
          <span>
            <button>Update Parts</button>
          </span>
        </div>
      </div>
    </div>
  );
}
