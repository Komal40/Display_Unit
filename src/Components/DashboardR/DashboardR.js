import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";


export default function DashboardR() {
  const location = useLocation();
  const { responseData } = location.state || {};
  const [apiData, setApiData] = useState(null);
  const { userData } = useUser();
  const codeData = userData.logindata;

  const currentDate = new Date();

  // Get the date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const day = currentDate.getDate();
  
  // Get the time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  const formattedDateTime = `${day} ${monthName} : ${hours}:${minutes}:${seconds}`;
 
  return (
    <div>
      <div className="dashboard_container">
        <div className="dashboard_navbar">
          <div>
            <p className="dashboard_content">
              Name: <h4>{codeData.first_name+" "+codeData.last_name}</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              Device Id: <h4>{}</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              User Id:<h4>{codeData.employee_code}</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">{formattedDateTime}</p>
          </div>
          <div className="dashboard_content">
            <IoNotificationsOutline className="bell" />
          </div>
        </div>
      </div>

      <div className="dashboard__container">
        <div className="dashboard_container_leftside">
          <div>
            <div>
              <p className="dashboard_content">
                Total Lines: <h4>7</h4>
              </p>
            </div>
            <div className="dashboard_content_leftline"></div>
          </div>

          <div>
            <div>
              <p className="dashboard_content">
                Total Stations: <h4> 40</h4>
              </p>
            </div>
            <div className="dashboard_content_leftline"></div>
          </div>

          <div>
            <div>
              <p className="dashboard_content">
                Active Stations: <h4> 8</h4>
              </p>
            </div>
            <div className="dashboard_content_leftline"></div>
          </div>
        </div>

        <div className="dasboard_container_rightside">
          <div>
            <div>
              <p className="dashboard_content">
                PARTS: <h4> 899/67</h4>
              </p>
            </div>
            <div className="dashboard_content_rightline"></div>
          </div>
          <div>
            <p className="dashboard_content">
              <h4>140 passed</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              <h4>5 failed</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              <h4>15 filled</h4>
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard_line"></div>
    </div>
  );
}
