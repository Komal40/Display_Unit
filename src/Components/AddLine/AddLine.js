import React, { useEffect, useState } from 'react'
import './AddLine.css'
import { FaPlus } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { PiPlusBold } from "react-icons/pi";
import { RiSubtractLine } from "react-icons/ri";
import { useUser } from '../../UserContext';


export default function AddLine({showModal, closeModal}) {

    const [count, setCount] = useState(0);
    const {portNum}=useUser()
    const {portLength} = useUser()

    const subCount = () => {
      if (count == 0) return;
      setCount((prevCount) => prevCount - 1);
    };
  
    const addCount = () => {
      setCount((prevCount) => prevCount + 1);
    };



    useEffect(() => {
      const fetchData = async () => {
        const link = process.env.REACT_APP_BASE_URL;
        const endPoint = "/line/addline";
        const fullLink = link + endPoint;
    
        try {
          const params = new URLSearchParams();
          params.append("floor_id", "1");
          params.append("part_id",portNum.part_id)
          params.append("part_name", portNum.part_name)
    
          const response = await fetch(fullLink, {
            method: "POST",
            body: params,
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Add Line", data);
        
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
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {/* {Add heading of Station Modal} */}
        <div>
          <div>
            <p>
              <h4>Add New Line</h4>
            </p>
          </div>
          <div className="dashboard_content_leftline"></div>
        </div>

    {/* <div className='newLine_dropdown'>
   
<div className='newLineinput'>
<input placeholder='Part Number'/>
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
    </div> */}

        {/* components */}

    {/* <div className="addStation_container">
    <div className="addStations">
          <div className="addstation_component">
            <p className="addStaionName">Station Name&nbsp;&nbsp;<h4>1VF</h4></p>
            <input className="addstation_inputlabel" placeholder="Operator Name"/>
        
            <div className="dropdown_addStation">
              <select>
                <option>Select Process</option>
              </select>
            </div>
            
          </div>
        </div>

        <div className="addStations">
          <div className="addstation_component">
            <p className="addStaionName">Station Name&nbsp;&nbsp;<h4>1VF</h4></p>
            <input className="addstation_inputlabel" placeholder="Operator Name"/>
        
            <div className="dropdown_addStation">
              <select>
                <option>Select Process</option>
              </select>
            </div>
            
          </div>
        </div>
        <div className="addStations">
          <div className="addstation_component">
            <p className="addStaionName">Station Name&nbsp;&nbsp;<h4>1VF</h4></p>
            <input className="addstation_inputlabel" placeholder="Operator Name"/>
        
            <div className="dropdown_addStation">
              <select>
                <option>Select Process</option>
              </select>
            </div>
            
          </div>
        </div>
        
    </div> */}

{/*         
    <div>
            <p>Error Message</p>
        </div> */}




       <div className='changeport__container'>

       <div className="change_port_num">
            <select>
              <option>Port Number</option>
              {Array.from({ length:portLength}, (_, index) => (
                <option key={index + 1} value={`Line ${index + 1}`}>{portNum[index].part_name}</option>
              ))}
            </select>
          </div>       
       </div>


      </div>





      <div className="addStationsBtnLine">
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
  )
}
