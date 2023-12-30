import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Line from "../Line/Line";
import Operator from "../Operator/Operator";
import DashboardR from "../DashboardR/DashboardR";

export default function Dashboard({ isNavbarClose }) {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    // console.log("userData", userData)

    // console.log("codeData", codeData);

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/stations/getstations";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // setApiData(data);
          console.log("StationData", data);
          setArr(data.stationdata);
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
      <Line />
     
 <div className="dashboard_stations">
 {arr.map((item) => (
        
        <div className="operator_line">
          <div className="operator_container1">
            <div>
              <p className="operator_content">
                Operator&nbsp;&nbsp; <h4>{item.e_one}</h4>
              </p>
              <p className="operator_content">
                Min Skill &nbsp;&nbsp;<h4>{item.e_two}</h4>
              </p>
              <p className="operator_content">
                Station&nbsp;&nbsp; <h4>{item.station_num}</h4>
              </p>
              <p className="operator_content">
                Process &nbsp;&nbsp;<h4>{item.line_num}</h4>
              </p>
              <p className="operator_content">
                Required Skill &nbsp;&nbsp;<h4>{item.floor_num}</h4>
              </p>
            </div>
            <div className="operator_below_content">
              19 Done&nbsp; 19 Pass &nbsp;4 Fail&nbsp; 9 Added
            </div>
          </div>
        </div>
      ))}

  </div>
      <Line />

      <Line />
    </div>
  );
}
