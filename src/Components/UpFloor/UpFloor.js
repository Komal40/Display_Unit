import React, { useEffect } from 'react'
import './UpFloor.css'
import { FaPlus } from "react-icons/fa6";
import AddLine from '../AddLine/AddLine';
import Navbar from '../Navbar/Navbar';
import DashboardR from '../DashboardR/DashboardR';
import { useUser } from '../../UserContext';


export default function UpFloor() {

  const {setNumberOfLines}=useUser()
  const {lines}=useUser()


  useEffect(() => {
    // console.log("lines", lines)

    // console.log("codeData", codeData);

    const fetchData = async () => {
      const link = process.env.REACT_APP_FLOOR_LINE;
      console.log('Base URL:', link);
      const endPoint = '/floor/getfloor';
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        // params.append("employee_code", responseData.employee_code);
        // params.append("password", responseData.password);

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNumberOfLines(data); // Store the fetched data in state
          console.log("API Response:", data);
         
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
        <div>
            <Navbar/>
        </div>
        <div>
            <DashboardR/>
        </div>
      <div className="updatesFloor__cont">
<div className="update_linecontainer">
          <div className="update_dropdown">
            <select>
              <option>Select Line</option>
              <option>Line 2</option>
            </select>
          </div>
          <div className="update_add_btn">
            <FaPlus className="update_plus" />
            <span>
              <button>Add New Line</button>
            </span>
          </div>

          <div className="update_error">
            <h5>Error Message: </h5>
          </div>
      </div>

      <div className="updateparts__btn">            
            <span>
              <button >Update Parts</button>
            </span>
        </div>
</div>
    </div>
  )
}
