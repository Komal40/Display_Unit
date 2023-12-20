import React from "react";
import "./Dashboard.css";
import Line from "../Line/Line";
import Operator from "../Operator/Operator";
import DashboardR from "../DashboardR/DashboardR";


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

      <DashboardR />
      <Line />
      <Operator />

      <Line />
      <Operator />

      <Line />
      <Operator />
    </div>
  );
}


