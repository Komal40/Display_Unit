import React, { useState } from "react";
import "./Login.css";
import bg from "../../Images/bg.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username and password are valid
    if (name === "validUsername" && pass === "validPassword") {
      // If valid, you can navigate or perform other actions
      console.log("Login successful");
      setError("");
      setMsg("Login Successfully");
      setName("");
      setPass("");
    } else {
      setError("Invalid Username and Password");
    }
  };

  const clickLogin = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("username", name);
      params.append("password", pass);
      params.append("location", "gurugram");
      
      const response = await fetch("http://18.212.243.182:3000/floorincharge/login", {
        method: "POST",
        body: params,
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(response, "respo");
        navigate('/')
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }

      // const response2 = await fetch(
      //   "http://18.212.243.182:3000/floorincharge/login",
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       username: "amitkumar2",
      //       password: "amitkumar",
      //       location: "gurugram",
      //     }),
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //   }
      // );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(response, "respo");
        // navigate('/')
        setError("");
        setMsg("Login Successfully");
        setName("");
        setPass("");
        // You can perform additional actions after a successful login
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error galt id:");
      setError("An unexpected error occurred");
    }
  };

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
