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
          document.cookie = "jwt=" + responseJson.jwt + "; " + expires + "; path=/; secure";

        });
      }
    });
  };

  return (
    <div id="loginScreenContainer">
      <div id="loginContainer" className={className}>
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
          SIGN IN
        </CustomButton>
        <a className="link" href="/">
          Forgot password?
        </a>
        <a className="link" href="/signup">
          Don't have an account?
        </a>
      </div>
    </div>
  );
}
