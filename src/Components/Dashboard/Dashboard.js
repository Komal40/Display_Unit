import React from "react";
import "./Dashboard.css";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Dashboard({ isNavbarClose }) {
  // const dashboardStyle = {
  //   height: '4rem',
  //   width: isNavbarClose ? '100vw' : 'calc(100vw - 16rem)',
  //   marginLeft: isNavbarClose ? '0' : '16rem',
  //   backgroundColor: '#ECECEC',
  //   transition: 'width 0.3s ease, margin-left 0.3s ease',
  // };

  
  return (
    <div>
      {/* <div className={`${isNavbarClose ? 'dashboard_container':'shifted'}`}> */}
      {/* <div style={dashboardStyle}> */}
      <div className="dashboard_container">
        <div className="dashboard_navbar">
          <div>
            <p className="dashboard_content">
              Name: <h4>Arun Sharma</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              Device Id: <h4> 106677</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              User Id:<h4> 896557</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">2nd october : 12:06:09</p>
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
        <div className="dashboard_content_leftline">          
        </div>
       </div>
        
    <div>
    <div>
          <p className="dashboard_content">
            Total Stations: <h4> 40</h4>
          </p>
        </div>
        <div className="dashboard_content_leftline">          
        </div>
    </div>


     <div>
     <div>
          <p className="dashboard_content">
            Active Stations: <h4> 8</h4>
          </p>
        </div>
        <div className="dashboard_content_leftline">          
        </div>
     </div>
        </div>


        <div className="dasboard_container_rightside">
        <div>
        <div >
          <p className="dashboard_content">
            PARTS: <h4> 899/67</h4>
          </p>
        </div>
        <div className="dashboard_content_rightline">          
        </div>
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
