import React from 'react'
import "./Line.css" 
import { useUser } from '../../UserContext'


function Line({no}) {

  return (
    <div>
      <div className="dashboard__below_container">
        <div className="dashboard_container_leftbelowside">
       <div>
       <div>
          <p className="dashboard_content">
             <h4> Lines {no} </h4>

          </p>
        </div>
        <div className="dashboard_content_leftbelowline">          
        </div>
       </div>
        
    <div>
    <div>
          <p className="dashboard_content">
            <h4> 3 Stations</h4>
          </p>
        </div>
        <div className="dashboard_content_leftbelowline">          
        </div>
    </div>


     <div>
     <div>
          <p className="dashboard_content">
           <h4> Part Number: Air9067</h4>
          </p>
        </div>
        <div className="dashboard_content_leftbelowline">          
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

    <div className="dashboard_card_content">
      

    </div>
    </div>
  )
}

export default Line

