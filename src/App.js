import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <>
     {/* <Login/> */}
     <div className='app_container'>
    <Navbar/>
    <Dashboard/>
    </div>
    </>
  );
}

export default App;
