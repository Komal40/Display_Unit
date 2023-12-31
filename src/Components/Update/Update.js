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
import { useEffect } from "react";


export default function Update() {
  const [showModel, setShowModel] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [arr, setArr]=useState([]);
  const [line, setLine] = useState(0);

  const {lines}=useUser()
  const {lineStation} = useUser()
  const {lineNum}=useUser()
  
  const {setPortNumber}=useUser()
  const {setPortNumLength} = useUser()


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


useEffect(() => {
  const fetchData = async () => {
    const link = process.env.REACT_APP_BASE_URL;
    const endPoint = "/floor/parts";
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
        console.log("FloorPartsData", data.floorpartsdata);
        setArr(data.floorpartsdata)
        setPortNumber(data.floorpartsdata)
        setPortNumLength(data.floorpartsdata.length)
        setLine(data.floorpartsdata.length)
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
}, []);



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
                <option>Line {lineNum}</option>
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
            <h4>Line {lineNum}</h4>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <h4>Part: 1VF</h4>
          </div>
          <div className="update_dropdown2">
            <select>
              <option>Change Port Number</option>
              {Array.from({ length:line }, (_, index) => (
                <option key={index + 1} value={`Line ${index + 1}`}>{arr[index].part_name}</option>
              ))}
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
              .filter((item) => item.line_num === lineNum)
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
