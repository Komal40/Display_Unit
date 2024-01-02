import React, { useEffect } from "react";
import "./UpFloor.css";
import { FaPlus } from "react-icons/fa6";
import AddLine from "../AddLine/AddLine";
import Navbar from "../Navbar/Navbar";
import DashboardR from "../DashboardR/DashboardR";
import { useUser } from "../../UserContext";


export default function UpFloor() {
  const { userData } = useUser();
  const codeData = userData.logindata;

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
            <select>
              <option>Select Line</option>
              <option>Line 2</option>
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
