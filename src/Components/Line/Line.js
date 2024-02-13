import React, { useEffect, useState } from "react";
import "./Line.css";
import { useUser } from "../../UserContext";

function Line({ no }) {
  const [lineData, setLineData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/get/line_no_station_no_assigned_parts";
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
          // console.log("dataa of line", data);
          setLineData(data.payload);
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };

    fetchData();
  }, [no]);

  
  return (
    <div>
      <div className="dashboard__below_container">
        <div className="dashboard_container_leftbelowside">
          <div>
            <div>
              <p className="dashboard_content">
                <h4> Line {no} </h4>
              </p>
            </div>
            <div className="dashboard_content_leftbelowline"></div>
          </div>

          <div>
            <div>
              <p className="dashboard_content">
                <h4 style={{display:'flex'}}>Stations:
                  {lineData.stations_count &&
                    lineData.stations_count
                      .filter((item) => item.line_number == `${no}`)
                      .map((filteredItem) => (
                        <p key={filteredItem.line_number}>
                          {filteredItem.number_of_stations}
                        </p>
                      ))}
                </h4>
              </p>
            </div>
            <div className="dashboard_content_leftbelowline"></div>
          </div>

          <div>
            <div>
              <p className="dashboard_content">
                <h4 style={{display:'flex'}}>Part Name:
                  {lineData.part_data &&
                    lineData.part_data
                      .filter((part) => part.line_id === `${no}`)
                      .map((part) => (
                        <p key={part.line_id + part.part_id}>
                           {part.part_name}
                        </p>
                      ))}
                </h4>
              </p>
            </div>
            <div className="dashboard_content_leftbelowline"></div>
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
              <h4> passed</h4>
            </p>
          </div>
          <div>
            <p className="dashboard_content">
              <h4> failed</h4>
            </p>
          </div>
          {/* <div>
          <p className="dashboard_content">
            <h4>15 filled</h4>
          </p>
        </div> */}
        </div>
      </div>

      <div className="dashboard_card_content"></div>
    </div>
  );
}

export default Line;
