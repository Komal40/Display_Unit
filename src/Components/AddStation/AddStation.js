// AddStationModal.js
import "./AddStation.css";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";

const AddStationModal = ({ showModal, closeModal }) => {
  
  const [count, setCount] = useState(1);

  const generateDivs = () => {
    const divs = [];
    for (let i = 0; i < count; i++) {
      divs.push(
        <div className="addStations" key={i}>
          <div className="addstation_component">
            <p className="addStaionName">
              Station Name&nbsp;&nbsp;<h4>1VF</h4>
            </p>
            <input
              className="addstation_inputlabel"
              placeholder="Operator Name"
            />
            <input
              className="addstation_inputlabel"
              placeholder="Operator Skill"
            />
            <div className="dropdown_addStation">
              <select>
                <option>Select Process</option>
              </select>
            </div>
            <p>Required Skill</p>
            <input className="addstation_inputlabel" placeholder="Password" />
          </div>
        </div>
      );
    }
    return divs;
  };
  

  const subCount = () => {
    if (count == 1) return;

    setCount((prevCount) => prevCount - 1);
  };

  const addCount = () => {
    if (count ==10) return;
    setCount((prevCount) => prevCount + 1); 
  };

  useEffect(() => {
    generateDivs();
  }, [count]);
  
  const update = async (e) => {
        e.preventDefault();    
        const link = process.env.REACT_APP_BASE_URL;
        console.log('Base URL:', link);
        const endPoint = '/station/add';
        const fullLink = link + endPoint;
    
        try {
          const data = [
            {
              "station_id": "F1L2S11",
              "e_one": "E12",
              "e_one_name": "Gaurav Sharma",
              "e_one_skill": "10",
              "e_two": "E15",
              "e_two_name": "Amzad",
              "e_two_skil": "8",
              "process_id": "2",
              "process_skill": "coating",
              "process_name": "komal",
            },
          ];
    
          const response = await fetch(fullLink, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json", // Set the Content-type header for JSON request
              "Accept": "application/json", // Set the Accept header for JSON response
            },
          });
    
          console.log("add station",JSON.stringify(data));
    
          if (response.ok) {
            const responseData = await response.json();
            console.log("update api", responseData);
          } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
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
        <div className="addStation_container" >
          {generateDivs()}
        </div>
      

        <div>
          <p>Error Message</p>
        </div>
      </div>

      <div className="addStationsBtn">
        <button className="addstationcancelbtn">Cancel</button>
        <div className="update__btn">
          <FaRegSave className="update_regsave" />
          <span>
          <button onClick={update}>Update</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddStationModal;




