// AddStationModal.js
import "./AddStation.css";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";


const AddStationModal = ({ showModal, closeModal }) => {
  const [count, setCount] = useState(0);

  const subCount = () => {
    if (count == 0) return;
    setCount((prevCount) => prevCount - 1);
  };

  const addCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {/* {Add heading of Station Modal} */}
        <div>
          <div>
            <p>
              <h4>Add New Station</h4>
            </p>
          </div>
          <div className="dashboard_content_leftline"></div>
        </div>

        <div className="addnostation">
          <p>Number of Stations </p>
          <div>
            <RiSubtractLine className="subSign" onClick={() => subCount()} />
          </div>
          <div className={`count_var ${count > 0 ? "active" : ""}`}>
            {count}
          </div>
          <div>
            <FaPlus className="subSign" onClick={() => addCount()} />
          </div>
        </div>

        {/* components */}

    <div className="addStation_container">
    <div className="addStations">
          <div className="addstation_component">
            <p className="addStaionName">Station Name&nbsp;&nbsp;<h4>1VF</h4></p>
            <input className="addstation_inputlabel" placeholder="Operator Name"/>
            <input className="addstation_inputlabel" placeholder="Operator Skill"/>
            <div className="dropdown_addStation">
              <select>
                <option>Select Process</option>
              </select>
            </div>
            <p>Required Skill</p>
            <input className="addstation_inputlabel" placeholder="Password"/>
          </div>
        </div>

        <div className="addStations">
          <div className="addstation_component">
            <p className="addStaionName">Station Name&nbsp;&nbsp;<h4>1VF</h4></p>
            <input className="addstation_inputlabel" placeholder="Operator Name"/>
            <input className="addstation_inputlabel" placeholder="Operator Skill"/>
            <div className="dropdown_addStation">
              <select>
                <option>Select Process</option>
              </select>
            </div>
            <p>Required Skill</p>
            <input className="addstation_inputlabel" placeholder="Password"/>
          </div>
        </div>










    </div>
        
        <div>
            <p>Error Message</p>
        </div>

      </div>

      <div className="addStationsBtn">
        <button className="addstationcancelbtn">
            Cancel
        </button>
        <div className="update__btn">
            <FaRegSave className="update_regsave" />
            <span>
              <button>Update</button>
            </span>
      </div>
    </div>
    </div>
  );
};

export default AddStationModal;
