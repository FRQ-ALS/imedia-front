import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./AppBar.css";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import { useNavigate } from "react-router-dom";
import ProfilePill from "../ProfilePill/ProfilePill";
import NotificationTray from "../NotificationTray/NotificationTray";
import useAuth from "../../Hooks/AuthHook";
import CustomButton from "../CustomButton/CustomButton"


export default function Appbar(props) {
  const [loginWindowToggle, setLoginWindowToggle] = useState(false);
  const [notiTrayToggle, setNotiTrayToggle] = useState(false);

  let navigate = useNavigate();

  const signInHandler = () => {
    navigate("/login")
  };


  const homePageHandler = () => {
    navigate("/home");
  };

  const handleToggleNotiTray = () => {
    setNotiTrayToggle(!notiTrayToggle);
  };


  return (
    <div>
      <div variant="regular" className="main">
        <div id="homeLabelContainer" className="home-container">
          <Button onClick={homePageHandler}>
            <MapsHomeWorkRoundedIcon className="homeIcon" />
          </Button>
          <label id="imediaLabel">iMedia School Portal</label>
        </div>
        {!props.setLogin ? (
          <div className="login-container">
            <CustomButton
              id="signInButton"
              onClick={signInHandler}
        
            >
              SIGN IN
            </CustomButton>
          </div>
        ) : (
          <ProfilePill
            onToggleNotiTray={handleToggleNotiTray}
            // onSetLoggedInStatus={handleLoggedInStatus}
          />
        )}
      </div>

      {/* {loginWindowToggle ? (
        <div container className="loginWindowWrapper">
          <LoginWindow
            onSetLoggedInStatus={handleLoggedInStatus}
            show={loginWindowToggle}
            onClickOutside={(event) => setLoginWindowToggle(false)}
            className="loginWindow"
          />
        </div>
      ) : null} */}

      <div className="notificationTrayWrapper">
        <NotificationTray
          show={notiTrayToggle}
          onClickOutSide={(event) => setNotiTrayToggle(false)}
        />
      </div>
    </div>
  );
}
