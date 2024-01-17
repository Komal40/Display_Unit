import React from 'react'
import './Task.css'
import Navbar from '../Navbar/Navbar'
import DashboardR from '../DashboardR/DashboardR'
import DashBoardAbove from '../DashboardR/DashBoardAbove'

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
            <input className='task_inp'/>
        </div>

    </div>
    </>
  )
}
