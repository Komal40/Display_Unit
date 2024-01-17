// AddStationModal.js
import "./AddStation.css";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import { useUser } from "../../UserContext";
import { FiLogIn } from "react-icons/fi";
import Login from "../Login/Login";

const AddStationModal = ({ showModal, closeModal }) => {
  const [count, setCount] = useState(1);
  const [stationnum, setStationNum] = useState();

  const [selectedMornEmployee, setSelectedMornEmployee] = useState("");
  const [selectedEveEmployee, setSelectedEveEmployee] = useState("");
  const [selectProcess, setSelectedProcess] = useState("");
  const [mornValue, setMornValue] = useState("");
  const [eveValue, setEveValue] = useState("");
  const [skill, setSkill] = useState("");

  const [mornName, setMornName]=useState("");
  const [eveName, setEveName]=useState("")
  const [empSkill, setEmpSkill]=useState("")

  // stationLine is length of stations on particular line
  const { stationLine } = useUser();
  const { stationId } = useUser();
  // const [idLen, setIdLen]=useState(stationLine)
  const [stationid, setStationid] = useState(stationLine);
  const [arr, setArr] = useState([]);

  const { LoginProcess } = useUser();

  // useEffect(() => {
  //   // Update stationId whenever count changes
  //   setStationid(stationLine + count);
  // }, [count, stationLine]);

  const getData = (e) => {
    setStationNum(stationnum);
  };

  const closeAndClearModal = () => {
    // Reset all state variables to their initial values
    setCount(1);
    setStationNum("");
    setSelectedMornEmployee("");
    setSelectedEveEmployee("");
    setSelectedProcess("");
    setMornValue("");
    setEveValue("");
    setSkill("");
    setMornName("");
    setEveName("");
    setEmpSkill("");

    // Close the modal
    closeModal();
  };


  
  const generateDivs = () => {
    // setStationid(stationLine + count)
    const divs = [];
    {
      console.log("station line", stationLine);
    }
    {
      console.log("stationLine + count", stationLine + count);
    }
    for (let i = 0; i < count; i++) {
      const currentStationId = divs[i] || stationLine + i + 1;
      divs.push(
        <div className="addStations" key={i}>
          <div className="addstation_component">
            <p className="addStaionName">
              Station Name&nbsp;&nbsp;
              <h4>{`${stationId}${currentStationId}`}</h4>
            </p>
            <h4 className="morn_eve">Morning&nbsp;&nbsp;</h4>

            <div className="dropdown_morn_eve_Station">
              <select
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedMornEmployee(selectedValue);
                  setMornValue(selectedValue);
                  // Find the corresponding employee object based on the selected value
                  const selectedEmployee =
                    LoginProcess.payload.employess_data.find(
                      (employee) => employee.employee_code === selectedValue
                    );

                  // Update the state with the selected employee code
                  setSelectedMornEmployee(
                    selectedEmployee?.employee_code || ""
                  );
                  console.log("Selected morn Employee:", selectedEmployee.full_name);
                  setMornName(selectedEmployee.full_name)
                }}
              >
                <option>Select Name</option>
                {Array.from(
                  { length: LoginProcess.payload.employess_data.length },
                  (_, index) => (
                    <option
                      key={index + 1}
                      value={
                        LoginProcess.payload.employess_data[index].employee_code
                      }
                    >
                      {LoginProcess.payload.employess_data[index].full_name}
                    </option>
                  )
                )}
              </select>

              {/* Display selected employee code */}
              <p>Employee Code: {selectedMornEmployee}</p>
            </div>

            <h4 className="morn_eve" style={{ marginTop: "0.5rem" }}>
              Evening&nbsp;&nbsp;
            </h4>
            {/* <input className="addstation_inputlabel" placeholder="Operator Skill" /> */}
            <div className="dropdown_morn_eve_Station">
              <select
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedEveEmployee(selectedValue);
                  setEveValue(selectedValue);
                  {console.log("selec", selectedValue)}

                  // Find the corresponding employee object based on the selected value
                  const selectedEmployee =
                    LoginProcess.payload.employess_data.find(
                      (employee) => employee.employee_code === selectedValue
                    );

                  // Update the state with the selected employee code for evening shift
                  setSelectedEveEmployee(selectedEmployee?.employee_code || "");
                  console.log("Selected eve Employee:", selectedEmployee.full_name);
                  setEveName(selectedEmployee.full_name)

                }}
              >
                <option>Select Name</option>
                {LoginProcess.payload.employess_data &&
                LoginProcess.payload.employess_data.length > 0 ? (
                  Array.from(
                    { length: LoginProcess.payload.employess_data.length },
                    (_, index) => (
                      <option
                        key={index + 1}
                        value={
                          LoginProcess.payload.employess_data[index]
                            .employee_code
                        }
                      >
                        {LoginProcess.payload.employess_data[index].full_name}
                      </option>
                    )
                  )
                ) : (
                  <option>No Employees Data</option>
                )}
              </select>

              {/* Display selected employee code for evening shift */}
              <p>Employee Code: {selectedEveEmployee}</p>
            </div>

            <div className="dropdown_addStation">
              <select
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedProcess(selectedValue);
                  setSkill(selectedValue);
                  {
                    console.log("slectedprocess", selectedValue);
                  }

                  // Find the corresponding process object based on the selected value
                  const selectedProcess =
                    LoginProcess.payload.process_data.find(
                      (process) => process.prrocess_skill === selectedValue
                    );
                  {
                    console.log("selecetd process", selectedProcess);
                  }
                  // Update the state with the selected process skill
                  setSelectedProcess(selectedProcess?.prrocess_skill || "");
                  console.log("Selected process skill Employee:", selectedProcess.process_name);
                  setEmpSkill(selectedProcess.process_name)

                }}
              >
                <option>Select Process</option>
                {Array.from(
                  { length: LoginProcess.payload.process_data.length },
                  (_, index) => (
                    <option
                      key={index + 1}
                      value={
                        LoginProcess.payload.process_data[index].prrocess_skill
                      }
                    >
                      {LoginProcess.payload.process_data[index].process_name}
                    </option>
                  )
                )}
              </select>

              {/* Display selected process skill */}
              <p>Required Skill: {selectProcess}</p>
            </div>

          
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
    if (count == 10) return;
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    generateDivs();
    {
      console.log("LoginProcess", LoginProcess);
    }
    setArr(LoginProcess);
  }, [count, LoginProcess.payload]);

  const update = async (e) => {
    e.preventDefault();
    const link = process.env.REACT_APP_BASE_URL;
    console.log("Base URL:", link);
    const endPoint = "/station/add";
    const fullLink = link + endPoint;

    try {
      // Create an array to store data for all stations
      const stationDataArray = [];
      const baseStationId = stationId; // Define the base part of the station_id

      const dynamicStationId = `${baseStationId}${stationLine + count}`; // Construct the dynamic station_id

      for (let i = 0; i < count; i++) {
        const dynamicStationId = `${baseStationId}${stationLine + i + 1}`;

        const stationData = {
          station_id: dynamicStationId,
          e_one: mornValue,
          e_one_name: mornName,
          e_one_skill: "10",
          e_two: eveValue,
          e_two_name: eveName,
          e_two_skil: "8",
          process_id: "2",
          process_skill: selectProcess,
          process_name: empSkill,
        };

        stationDataArray.push(stationData);
      }

      const response = await fetch(fullLink, {
        method: "POST",
        body: JSON.stringify(stationDataArray),
        headers: {
          "Content-type": "application/json", // Set the Content-type header for JSON request
          Accept: "application/json", // Set the Accept header for JSON response
        },
      });

      console.log("add station", JSON.stringify(stationDataArray));
      console.log("dynamic station id", dynamicStationId);

      if (response.ok) {
        const responseData = await response.json();
        console.log("add api", responseData);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  if (!LoginProcess.payload) {
    // Loading state
    return <div>Loading...</div>;
  }


  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeAndClearModal}>
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
        <div className="addStation_container">{generateDivs()}</div>

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
