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
import AddLine from "../AddLine/AddLine";
import { TbReload } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import { useUser } from "../../UserContext";

export default function Update() {
  const [showModel, setShowModel] = useState(false);
  const [showLine, setShowLine] = useState(false);

  const {lineStation} = useUser()

  const openModal = () => {
    setShowModel(true);
  };

  const closeModel = () => {
    setShowModel(false);
  };

  const addStation = () => {
    // openModal()

    setShowModel(true);
    // alert('click')
  };

  const addLine = () => {
    setShowLine(true);
  };
  const closeLine = () => {
    setShowLine(false);
  };

console.log("line station",lineStation)


  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <DashboardR />
      </div>

      <div className="update_main">
        <div className="updates__cont">
          <div className="update_linecontainer">
            <div className="update_dropdown">
              <select>
                <option>Line 1</option>
                
              </select>
            </div>
            <div className="update_add_btn">
              <FaPlus className="update_plus" onClick={addLine} />
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

        {/* <div className="updateComp_container">
          <UpdateComp />
          <UpdateComp />
          <UpdateComp />
          <div className="update_addSection">
            <PiPlusBold className="addstation" onClick={addStation} />
            <p className="addStation_text">Add</p>
            <p className="addStation_text">Station</p>
          </div>
        </div> */}



        <AddLine showModal={showLine} closeModal={closeLine} />
        <AddStation showModal={showModel} closeModal={closeModel} />
      </div>

      <div className="updattee">
            {lineStation 
              .filter((item) => item.line_num === 1)
              .map((item) => (
                <div className="update__components">
                <div>
                  <p className="operator_content">
                    Operator&nbsp;&nbsp; <h4>{item.e_one_name}</h4>
                  </p>
                  <p className="operator_content">
                    Operator Skill&nbsp;&nbsp; <h4>10</h4>
                  </p>
                  <p className="operator_content">
                    Station&nbsp;&nbsp; <h4>145A</h4>
                  </p>
                  <p className="operator_content">
                    Process &nbsp;&nbsp;<h4>{item.process_name}</h4>
                  </p>
                  <p className="operator_content">
                    Process Skill&nbsp;&nbsp; <h4>11</h4>
                  </p>
                </div>
                <div className="update_below1_content">
                  <div className="update_below_content">
                    <div className="update_remove_btn1">
                      <TbReload className="update_regsave" />
                      <span>
                        <button>Change</button>
                      </span>
                    </div>
                    <div className="update_remove_btn2">
                      <FiTrash className="update_regsave" />
                      <span>
                        <button>Remove</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              ))}
           <div className="update_addSection">
            <PiPlusBold className="addstation" onClick={addStation} />
            <p className="addStation_text">Add</p>
            <p className="addStation_text">Station</p>
          </div>
          </div>
          
        
    </>
  );
}
