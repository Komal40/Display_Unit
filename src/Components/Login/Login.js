import React, { useState } from "react";
import "./Login.css";
import bg from "../../Images/bg.png";

export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

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
                <form className="login_form" onSubmit={handleLogin}>
                  <div className="form_details">
                    <label htmlFor="name" className="user_label">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="password" className="pass_label">
                      Password
                    </label>
                    <input
                      type="password"
                      required
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
