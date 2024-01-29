import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Line from "../Line/Line";
import Operator from "../Operator/Operator";
import DashboardR from "../DashboardR/DashboardR";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate=useNavigate()
  //MY VARIABLES

  const [firstEffectCompleted, setFirstEffectCompleted] = useState(false);

  //MY VARIABLES

  const [arr, setArr] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [line, setLine] = useState(0);
  const [pass, setPass] = useState(0);
  const [fail, setFail] = useState(0);

  const [stations, setStations] = useState(0);

  const { setNumberLineStations } = useUser();

  const { setNumberOfLines } = useUser();


  const {loginData}=useUser();
  console.log("loginData", loginData)

  const {setProcessDataFun}=useUser();

  const currentDate = new Date();

  // Get the date components
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const day = currentDate.getDate();

 


  useEffect(() => {
    if (!firstEffectCompleted) return;

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/stations/getstations";
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
          console.log("StationData", data.stationdata);
          setArr(data.stationdata);
          setNumberLineStations(data.stationdata);
          // console.log("length station",data.stationdata.length)
          setStations(data.stationdata.length);
          // setNumberOfLines(data.stationdata.line_num)
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };

    // Introduce a delay of 3 seconds (3000 milliseconds)

    fetchData();

    // Dependency array is empty to run the effect only once
  }, [firstEffectCompleted]);


  useEffect(() => {
    // console.log("lines", lines)

    // console.log("codeData",codeData );

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/floor/getfloor";
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

        console.log("floor-id", "1");

        if (response.ok) {
          setFirstEffectCompleted(true);
          const data = await response.json();
          // console.log("response", response)
          const line_num = data.floordata.number_of_lines;
          // console.log(data)
          console.log("number of lines ", line_num);
          setLine(line_num);
          setNumberOfLines(line_num);
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/work/getoperator";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("month", "01");
        params.append("date", "05");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(day,month)
          console.log("process data", data.processdata);
          console.log("Process data is array", Array.isArray(data.processdata));
          setProcessDataFun(data.processdata);
          setProcessData(data.processdata);
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      {/* <div className={`${isNavbarClose ? 'dashboard_container':'shifted'}`}> */}
      {/* <div style={dashboardStyle}> */}

      <DashboardR />
      {Array.from({ length: line }).map((_, index) => (
        <div key={index}>
          <Line no={index + 1} />

          {/* stations */}
          <div className="dashboard_stations">
            {arr
              .filter((item) => item.line_num === index + 1)
              .map((item) => {
                const stationNum = item.station_num;
                
                const passes = processData.filter(
                  (data) => data.status == "1" && data.station_num == stationNum
                ).length;
                const fails = processData.filter(
                  (data) => data.status == "0" && data.station_num == stationNum
                ).length;
                // const stationId=processData.filter((e)=>e.station_num==stationNum)


                return (
                  <div className="operator_line">
                    <div className="operator_container1">
                      <div>
                        
                      
                        <h3>Morning Shift</h3>
                        <p className="operator_content">
                          Operator&nbsp;:&nbsp; <h4>{item.e_one_name}</h4>
                        </p>
                        <p className="operator_content">
                          Operator Skill:&nbsp;&nbsp;<h4>{item.e_one_skill}</h4>
                        </p>
                        <p className="operator_content">
                          Station :&nbsp;&nbsp; <h4>{item.station_num}</h4>
                        </p>
                        <p className="operator_content">
                          Process :&nbsp;&nbsp;<h4>{item.process_name}</h4>
                        </p>
                        <br />
                        <h3>Evening Shift</h3>
                        <p className="operator_content">
                          Operator :&nbsp;&nbsp; <h4>{item.e_two_name}</h4>
                        </p>
                        <p className="operator_content">
                          Operator Skill:&nbsp;&nbsp;<h4>{item.e_two_skill}</h4>
                        </p>
                        <p className="operator_content">
                          Process Skill:&nbsp;&nbsp;
                          <h4>{item.process_skill}</h4>
                        </p>
                      </div>
                      <div className="operator_below_content">
                        {passes+fails}Done&nbsp; {passes} Pass &nbsp;{fails}
                        Fail&nbsp; 9 Added
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

