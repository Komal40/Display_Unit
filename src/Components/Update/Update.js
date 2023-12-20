import React, { useState } from "react";
import "./Update.css";
import Navbar from "../Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import DashboardR from "../DashboardR/DashboardR";
import { FaPlus } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import UpdateComp from "./UpdateComp";
import { PiPlusBold } from "react-icons/pi";
import AddStation from "../AddStation/AddStation";


export default function Update() {

  const [showModel, setShowModel]=useState(false);

  const openModal = ()=>{
    setShowModel(true)
  }

  const closeModel=()=>{
    setShowModel(false)
  }

  const addStation = () => {
    openModal()
    // alert('click')
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <DashboardR />
      </div>

      <div className="update_main">
        <div className="update_linecontainer">
          <div className="update_dropdown">
            <select>
              <option>Line 1</option>
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

        <div className="update_linecontainer2">
          <div>
            <h4>Line 1</h4>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <h4>Part: 1VF</h4>
          </div>
          <div className="update_dropdown2">
            <select>
              <option>Change Port Number</option>
              <option>Line 2</option>
            </select>
          </div>
          <div className="update__btn">
            <FaRegSave className="update_regsave" />
            <span>
              <button>Update</button>
            </span>
          </div>
        </div>

        <div className="update_linecontainer3">
          <h4>Stations:</h4>
        </div>

        <div className="updateComp_container">
          <UpdateComp />
          <UpdateComp />
          <UpdateComp />
          <div className="update_addSection">
            <PiPlusBold className="addstation" onClick={addStation} />
            <p className="addStation_text">Add</p>
            <p className="addStation_text">Station</p>
          </div>
        </div>

        <AddStation showModel={showModel} closeModel={closeModel}/>
      </div>
    </>
  );
}
