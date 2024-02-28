import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { useState } from "react";

export default function DashBoardAbove() {

  const [apiData, setApiData] = useState(null);

  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // Log the data to the console
  console.log("UserData from localStorage jhhfvdf:", storedUserData.logindata);

  // const {loginData}=useUser();

  const { lines } = useUser();

  const currentDate = new Date();

  // Get the date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const day = currentDate.getDate();

  // Get the time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const formattedDateTime = `${day} ${monthName} : ${hours}:${minutes}:${seconds}`;

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   const parsedUserData = JSON.parse(storedUserData);
  //   console.log("UserData from localStorage:", parsedUserData);
  // }, []);


  return (
    <div>
      <div className="dashboard_container">
        <div className="dashboard_navbar">
          <div>
            <p className="dashboard_content">
              Name: <h4>{storedUserData?.logindata.first_name + " " +storedUserData?.logindata.last_name}</h4>
            </p>
          </div>
          {/* <div>
            <p className="dashboard_content">
              Device Id: <h4>{}</h4>
            </p>
          </div> */}
          <div>
            <p className="dashboard_content">
              User Id:<h4>{storedUserData?.logindata.employee_code}</h4>
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
    </div>
  );
}
