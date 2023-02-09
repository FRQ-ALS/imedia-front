import React, { useState, useEffect } from "react";
import CustomTextField from "./../TextField/CustomTextField";
import "./LoginWindow.css";
import useAuth from "../../Hooks/AuthHook";
import useAlert from "../../Hooks/AlertHook";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

export default function LoginWindow(props) {
  const className = "window " + props.className;
  const { setAuth, auth } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("loggedIn"));
    if (x === true) {
      navigate("/dashboard");
    }
  }, []);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };

  const handleLoginSubmit = (e) => {
    console.log(login);
    fetch("/api/v1/account/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    }).then((response) => {
      console.log(response);
      if (response.status != 200) {
        setAlert("Incorrect username/password. Please try again", "error");
        return;
      }

      if (response.ok) {
        setAuth(true);
        localStorage.setItem("loggedIn", true);
        navigate("/dashboard");
        response.json().then((responseJson) => {
          let date = new Date();
          date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + date.toUTCString();
          document.cookie =
            "jwt=" + responseJson.jwt + "; " + expires + "; path=/; secure";
        });
      }
    });
  };

  return (
    <div id="loginScreenContainer">
      <div>
        <img
          id="loginBackgroundImage"
          src="https://static.wixstatic.com/media/b48888122ae14993a250095f290cecd1.jpg/v1/fill/w_934,h_928,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b48888122ae14993a250095f290cecd1.jpg"
        ></img>
      </div>
      <div style={{ width:'100%',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <div id="loginContainer" className={className}>
      {/* <label id="loginHeadingLabel">iMedia School Portal</label> */}
      <img id="imediaBadge" src="https://static.wixstatic.com/media/9f1b94_dda5cfa09f504547b66f237ad22c5106~mv2.png/v1/fill/w_385,h_192,al_c,lg_1,q_85,enc_auto/9f1b94_dda5cfa09f504547b66f237ad22c5106~mv2.png"></img>
        <CustomTextField
          id="emailField"
          onChange={handleLoginChange}
          name="username"
          placeholder="Username"
          className="login"
        ></CustomTextField>

        <CustomTextField
          id="emailField"
          onChange={handleLoginChange}
          name="password"
          type="password"
          placeholder="Password"
          className="login"
        ></CustomTextField>
        <CustomButton
          onClick={handleLoginSubmit}
          id="signInButton123"
          variant="contained"
          color="secondary"
          // className="signin-button"
        >
          Login
        </CustomButton>
        <img id="offstedBadgeImage" src="https://static.wixstatic.com/media/b94e2f_5d7b5c27bd4e4f2e82e3432d7322b621~mv2.png/v1/crop/x_152,y_0,w_738,h_421/fill/w_452,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b94e2f_5d7b5c27bd4e4f2e82e3432d7322b621~mv2.png"></img>
      </div>
      </div>
    </div>
  );
}
