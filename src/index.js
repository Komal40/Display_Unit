import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Update from './Components/Update/Update';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Assign from './Components/Assign/Assign';
import Timings from './Components/Timings/Timings';
import Charts from './Components/Charts/Charts';
import Login from './Components/Login/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='/assign' element={<Assign/>}/>
        <Route path='/timing' element={<Timings/>}/>
        <Route path='/chart' element={<Charts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout'/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
