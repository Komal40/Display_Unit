import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Operator from './Components/Operator/Operator';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';




function App({openMenu}) {
  // const { loginData } = useUser();
  // const navigate=useNavigate()

  // if (!loginData) {
  //   // Redirect to the login page or handle the absence of login data
  //   return navigate('/')
  // }


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


