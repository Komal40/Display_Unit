import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Operator from './Components/Operator/Operator';


function App({openMenu}) {
  return (
    <>
     {/* <Login/> */}
     <div className='app_container'>
     <Navbar isOpen={openMenu}/>
      <Dashboard isNavbarClose={openMenu} /> 
    </div>
    </>
  );
}

export default App;

