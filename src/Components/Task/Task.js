import React from 'react'
import './Task.css'
import Navbar from '../Navbar/Navbar'
import DashboardR from '../DashboardR/DashboardR'
import DashBoardAbove from '../DashboardR/DashBoardAbove'
import { FaPlus } from "react-icons/fa6";
import { RiEqualFill } from "react-icons/ri";

export default function Task() {
  return (
    <>
    <div>
      <Navbar/>
    </div>

    <div>
        <DashBoardAbove/>
    </div>

    <div className='task_container'>
        <div className='task__above'>
        <div className='task_aboveLine'>
            <p>Add Task</p>
            <div className="dashboard_content_leftline"></div>
        </div>
        <div className='task_abovedrodown'>
            <select>
                <option>Select Date</option>
            </select>
        </div>
        </div>

        <div className='task_line_select'>
        <div className='task_abovedrodown'>
            <select>
                <option>Select Line</option>
            </select>
        </div>
        </div>

        <div className='task_partrunning'>
            <p>Part Running: </p>
            <div className="dashboard_content_leftline"></div>
        </div>

        <div className='task_Add_input'>
            <input className='task_inp' placeholder='Add Quantity'/>
        </div>

        <div >



<div className='task_qty_container'>
    <div>
    <p>Previous Quantity: <span className='task_num'>350</span></p>
    <div className="dashboard_content_leftline"></div>
    </div>
   <div className='task_symbol'>
   <FaPlus className='task_num'/>
   </div>
    <div>
    <p>Current Quantity:<span className='task_num'>5000</span></p>
    <div className="dashboard_content_leftline"></div>
    </div>
    <div className='task_symbol'>
    <RiEqualFill className='task_num'/>
    </div>
    <div>
    <h3>Total:5350</h3>
    <div className="dashboard_content_leftline"></div>
    </div>

    <div className='task_add_button'><button>Add Task</button></div>
</div>
        </div>

    </div>
    </>
  )
}
