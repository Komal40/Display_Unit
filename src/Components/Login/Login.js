import React, { useEffect, useState } from "react";
import "./Login.css";
import bg from "../../Images/bg.png";
import { json, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";


export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const { setUserDataContext } = useUser();
  // const { setUserDataContext, loginData } = useUser(); // Assuming loginData is stored in the context
  
  // Check if loginData is present in the context
  // const isUserLoggedIn = (loginData && loginData.payload) || localStorage.getItem('userLoggedIn');

// useEffect(()=>{
//   const storedUserData=localStorage.getItem("userData")
//   if(storedUserData){
//     setUserDataContext(JSON.parse(storedUserData))
//     navigate('/app')
//   }
// },[])

  const clickLogin = async (e) => {
    e.preventDefault();
  
    const link=process.env.REACT_APP_BASE_URL
    console.log('Base URL:', link);
    const endPoint='/user/loginadmin'
    const fullLink=link+endPoint

    try {
      const params = new URLSearchParams();
      params.append("employee_code", name);
      params.append("password", pass);

      // "building_id": "1",
      //   "employee_code": "E01",
      //   "first_name": "Rahul",
      //   "floor_id": "1",
      //   "last_name": "Dev",
      //   "password": "amzi2"
      
      const response = await fetch(`${fullLink}`, {
        method: "POST",
        body: params,
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });

      // if (response.ok) {
      //   const data = await response.json();
      //   console.log(response, "respo");
      //   // navigate('/')
      // } else {
      //   const errorData = await response.json();
      //   setError(`Error: ${errorData.message}`);
      // }

     
      if (response.ok) {
        const data = await response.json();
        console.log("loginData", data);
        setUserDataContext(data); 
        setError("");
        setMsg("Login Successfully");
        localStorage.setItem('userData', JSON.stringify(data));
        setName("");
        setPass("");
        navigate('/app')
        // You can perform additional actions after a successful login
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
       navigate('/')
      }
    } catch (error) {
      console.error("Error galt id:");
      setError("An unexpected error occurred");
      navigate('/')
    }
  };


    // If the user is already logged in, redirect to the app
    // if (isUserLoggedIn) {
    //   navigate('/app');
    //   return null; // You can return null or a loading indicator while redirecting
    // }



  return (
    <>
      <div className="login_section">
        <div className="login_left_sidebar">
          <div className="img_container">
            <img className="login_sidebar_img" src={bg} />
            <div className="overlay_text">INTERFACE</div>
            <div className="overlay_bottom_text">
              Developed By Cellus Tech India
            </div>
          </div>
          {/* <div className='login_sidebar_img' ></div> */}
        </div>

        <div className="login_right_sidebar">
          <div className="login_details">
            <h2>
              <strong>
                Login To <span style={{ color: "#FF9209" }}>Continue</span>
              </strong>
            </h2>
            <div className="dropdown">
              <select>
                <option>Admin</option>
                <option>Super Admin</option>
              </select>
            </div>
            <div className="login_below_section">
              <h3>Enter Your Username and Password</h3>
              <div className="user_pass">
                <form className="login_form" onSubmit={clickLogin}>
                  <div className="form_details">
                    <label htmlFor="name" className="user_label">
                      Username
                    </label>
                    <input
                      type="text"
                      // required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="password" className="pass_label">
                      Password
                    </label>
                    <input
                      type="password"
                      // required
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>

                  <div className="forgot_text">Forgot Password? </div>

                  <div className="login_btn">
                    <button type="submit">Login</button>
                  </div>
                  <div className="pass_or_fail">
                    <div>
                      {error && <div className="error_message">{error}</div>}
                    </div>
                    <div className="success_msg">
                      {msg && <div className="success_message">{msg}</div>}
                    </div>
                  </div>
                  <div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
