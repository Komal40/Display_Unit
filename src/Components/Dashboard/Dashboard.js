import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Line from "../Line/Line";
import Operator from "../Operator/Operator";
import DashboardR from "../DashboardR/DashboardR";
import { useUser } from "../../UserContext";


export default function Dashboard({ isNavbarClose }) {
  const [arr, setArr] = useState([]);
  const [line, setLine] = useState(0);
  
  const { userData } = useUser();
  const codeData = userData.logindata;

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      const endPoint = "/stations/getstations";
      const fullLink = link + endPoint;
  
      try {
        const params = new URLSearchParams();
        params.append("floor_id", codeData.floor_id);
  
        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
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
  
    // Introduce a delay of 3 seconds (3000 milliseconds)
  
      fetchData();


    // Dependency array is empty to run the effect only once
  }, []);
  

  
  useEffect(() => {
    // console.log("lines", lines)

    // console.log("codeData", );

    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/floor/getfloor";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("floor_id", codeData.floor_id);

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        console.log("floor-id", codeData.floor_id);

        if (response) {
          const data = await response.json();
          // console.log("response", response)
          const line_num=data.floordata.number_of_lines
          // console.log(data)
          console.log("number of lines ",line_num );
          setLine(line_num)
          console.log(line)
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
       {[...Array(line)].map((_, index) => (
        <Line/>
      ))} 
   

 <div className="dashboard_stations">
 {arr.map((item) => (
        
        <div className="operator_line">
          <div className="operator_container1">
            <div>
              <p className="operator_content">
                Operator&nbsp;&nbsp; <h4>{item.e_one_name}</h4>
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

    </div>
  );
}


