import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './Navbar.css';


export default function Navbar() {

    const [closeMenu, setCloseMenu]=useState(false);

    const handleClick=()=>{
        setCloseMenu(closeMenu);
    }




  return (
    <>
    <div>
      <nav className={closeMenu?'nav_active':'navbar'}>
      <div className={closeMenu?'nav_arrow_active':'nav_arrow'} >
      <h2>INTERFACE
        {/* <span><FaArrowLeft onClick={()=>handleClick()}/></span> */}
        </h2>
      </div>
     <div><FaArrowRight onClick={()=>handleClick()} className={closeMenu?'right_arrow_active':'right_arrow'} /></div>
        <div className={closeMenu?'content_container_active':'content_container'}>
        <ul>
            <li style={{color:'#FF9209'}}>DASHBOARD</li>
            <li>UPDATE FLOOR</li>
            <li>GENERATE CHART</li>
            <li>ACCOUNT</li>
            <hr style={{width:'100%'}}/>
            <li>LOG OUT</li>
        </ul>
        </div>
      </nav>
    </div>
    </>
  )
}


