import React from 'react'
import { useUser } from '../../UserContext'

export default function DashBoardBelow() {

    
    const {lines}=useUser()


  return (
    <div>
      
      <div className="dashboard__container">
        <div className="dashboard_container_leftside">
          <div>
            <div>
              <p className="dashboard_content">
                Total Lines: <h4>{lines}</h4>
              </p>
            </div>
            <div className="dashboard_content_leftline"></div>
          </div>

          <div>
            <div>
              <p className="dashboard_content">
                Total Stations: <h4> 6</h4>
              </p>
            </div>
            <div className="dashboard_content_leftline"></div>
          </div>

          <div>
            <div>
              <p className="dashboard_content">
                Active Stations: <h4> </h4>
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
  )
}
